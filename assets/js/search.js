(function (document, window) {
    "use strict";

    const form = document.querySelector("#search-form");
    const input = document.querySelector("#search-input");
    const fuzzyCheckbox = document.querySelector("#search-fuzzy");
    const clearButton = document.querySelector("#search-clear");
    const retryButton = document.querySelector("#search-retry");
    const status = document.querySelector("#search-status");
    const filters = document.querySelector("#search-filters");
    const results = document.querySelector("#search-results");
    const emptyMessage = document.querySelector("#search-empty");
    const failureMessage = document.querySelector("#search-failure");

    if (!form || !input || !fuzzyCheckbox || !clearButton || !retryButton || !status || !filters || !results || !emptyMessage || !failureMessage) {
        return;
    }

    const indexUrl = input.dataset.indexUrl || "/data/search.json";
    const resultLimit = Number(input.dataset.limit) || 50;
    const excerptLength = Number(input.dataset.textLength) || 260;
    const debounceDelay = Number(input.dataset.delay) || 350;
    const dateFormatter = new Intl.DateTimeFormat("en-US", {
        day: "numeric",
        month: "long",
        timeZone: "UTC",
        year: "numeric"
    });

    let searchIndex = [];
    let exactFuse;
    let fuzzyFuse;
    let currentResults = [];
    let activeType = "All";
    let debounceTimer;

    function setInterfaceState(state, message) {
        form.dataset.state = state;
        status.textContent = message;
        results.setAttribute("aria-busy", state === "loading" ? "true" : "false");
        failureMessage.hidden = state !== "failure";
        emptyMessage.hidden = state !== "empty";
        fuzzyCheckbox.disabled = state === "loading" || state === "failure";

        if (state === "failure" || state === "loading" || state === "idle") {
            filters.hidden = true;
        }
    }

    function queryFromUrl() {
        return new URLSearchParams(window.location.search).get("q") || "";
    }

    function fuzzyFromUrl() {
        const value = new URLSearchParams(window.location.search).get("fuzzy");
        return value === "1" || value === "true";
    }

    function updateUrl(query, fuzzyEnabled) {
        if (!window.history || !window.history.replaceState) {
            return;
        }

        const url = new URL(window.location.href);
        if (query) {
            url.searchParams.set("q", query);
        } else {
            url.searchParams.delete("q");
        }
        if (query && fuzzyEnabled) {
            url.searchParams.set("fuzzy", "1");
        } else {
            url.searchParams.delete("fuzzy");
        }
        window.history.replaceState({}, "", url);
    }

    function matchingRanges(searchResult, key) {
        const match = (searchResult.matches || []).find((candidate) => candidate.key === key);
        return match ? match.indices.slice() : [];
    }

    function mergeRanges(ranges, start, end) {
        const clipped = ranges
            .map((range) => [Math.max(range[0], start), Math.min(range[1], end - 1)])
            .filter((range) => range[0] <= range[1])
            .sort((left, right) => left[0] - right[0]);

        return clipped.reduce((merged, range) => {
            const previous = merged[merged.length - 1];
            if (previous && range[0] <= previous[1] + 1) {
                previous[1] = Math.max(previous[1], range[1]);
            } else {
                merged.push(range.slice());
            }
            return merged;
        }, []);
    }

    function queryRanges(text, query) {
        const safeText = text || "";
        const normalizedText = safeText.toLocaleLowerCase();
        const seenTerms = new Set();
        const terms = query
            .trim()
            .split(/\s+/)
            .map((term) => term.replace(/^["'“”]+|["'“”]+$/g, ""))
            .filter((term) => {
                const normalizedTerm = term.toLocaleLowerCase();
                if (!term || seenTerms.has(normalizedTerm)) {
                    return false;
                }
                seenTerms.add(normalizedTerm);
                return true;
            });
        const ranges = [];

        function isWordCharacter(character) {
            return Boolean(character && /[\p{L}\p{N}_]/u.test(character));
        }

        terms.forEach((term) => {
            const normalizedTerm = term.toLocaleLowerCase();
            let cursor = 0;

            while (cursor < normalizedText.length) {
                const matchStart = normalizedText.indexOf(normalizedTerm, cursor);
                if (matchStart === -1) {
                    break;
                }
                const matchEnd = matchStart + term.length;
                const startsInsideWord = isWordCharacter(normalizedTerm[0]) && isWordCharacter(normalizedText[matchStart - 1]);
                const endsInsideWord = isWordCharacter(normalizedTerm[normalizedTerm.length - 1]) && isWordCharacter(normalizedText[matchEnd]);
                if (!startsInsideWord && !endsInsideWord) {
                    ranges.push([matchStart, matchEnd - 1]);
                }
                cursor = matchStart + Math.max(term.length, 1);
            }
        });

        return ranges;
    }

    function highlightedFragment(text, ranges, start, end) {
        const fragment = document.createDocumentFragment();
        const safeText = text || "";
        const sliceStart = Math.max(0, start);
        const sliceEnd = Math.min(safeText.length, end);
        const visibleRanges = mergeRanges(ranges, sliceStart, sliceEnd);
        let cursor = sliceStart;

        if (sliceStart > 0) {
            fragment.append(document.createTextNode("… "));
        }

        visibleRanges.forEach((range) => {
            if (range[0] > cursor) {
                fragment.append(document.createTextNode(safeText.slice(cursor, range[0])));
            }

            const mark = document.createElement("mark");
            mark.textContent = safeText.slice(range[0], range[1] + 1);
            fragment.append(mark);
            cursor = range[1] + 1;
        });

        if (cursor < sliceEnd) {
            fragment.append(document.createTextNode(safeText.slice(cursor, sliceEnd)));
        }
        if (sliceEnd < safeText.length) {
            fragment.append(document.createTextNode(" …"));
        }

        return fragment;
    }

    function excerptBounds(text, ranges) {
        if (!ranges.length || text.length <= excerptLength) {
            return [0, Math.min(text.length, excerptLength)];
        }

        const strongestMatch = ranges.reduce((strongest, range) => {
            return range[1] - range[0] > strongest[1] - strongest[0] ? range : strongest;
        }, ranges[0]);
        const matchCenter = Math.floor((strongestMatch[0] + strongestMatch[1]) / 2);
        let start = Math.max(0, matchCenter - Math.floor(excerptLength / 2));
        const end = Math.min(text.length, start + excerptLength);

        if (end - start < excerptLength) {
            start = Math.max(0, end - excerptLength);
        }

        return [start, end];
    }

    function formatDate(date) {
        if (!date) {
            return "";
        }

        const parsedDate = /^\d{4}-\d{2}-\d{2}$/.test(date)
            ? new Date(`${date}T00:00:00Z`)
            : new Date(date);
        return Number.isNaN(parsedDate.getTime()) ? "" : dateFormatter.format(parsedDate);
    }

    function normalizeItem(item) {
        const uri = typeof item.uri === "string" ? item.uri : "";
        let type = item.type;

        // Keep a deployment transition safe if a browser briefly receives the
        // previous, untyped JSON index from its cache.
        if (!["Blog", "Ancestry", "Page"].includes(type)) {
            type = uri.startsWith("/blog/")
                ? "Blog"
                : (uri.startsWith("/ancestry/") && uri !== "/ancestry/" ? "Ancestry" : "Page");
        }

        return {
            title: typeof item.title === "string" && item.title ? item.title : "Untitled",
            uri,
            type,
            date: typeof item.date === "string" && item.date ? item.date : null,
            content: typeof item.content === "string" ? item.content : ""
        };
    }

    function createResult(searchResult, query) {
        const item = searchResult.item;
        const listItem = document.createElement("li");
        const article = document.createElement("article");
        const title = document.createElement("h2");
        const link = document.createElement("a");
        const metadata = document.createElement("p");
        const type = document.createElement("span");
        const excerpt = document.createElement("p");
        const contentMatchRanges = matchingRanges(searchResult, "content");
        const titleHighlightRanges = queryRanges(item.title || "Untitled", query);
        const contentHighlightRanges = queryRanges(item.content || "", query);
        const bounds = excerptBounds(item.content || "", contentHighlightRanges.length ? contentHighlightRanges : contentMatchRanges);

        listItem.className = "search-result";
        article.className = "search-result-card";
        title.className = "search-result-title";
        link.href = item.uri;
        link.append(highlightedFragment(item.title || "Untitled", titleHighlightRanges, 0, (item.title || "Untitled").length));
        title.append(link);

        metadata.className = "search-result-meta";
        type.className = `search-result-type search-result-type--${item.type.toLowerCase()}`;
        type.textContent = item.type;
        metadata.append(type);

        if (item.date) {
            const formattedDate = formatDate(item.date);
            if (formattedDate) {
                const separator = document.createElement("span");
                const time = document.createElement("time");
                separator.className = "search-result-separator";
                separator.setAttribute("aria-hidden", "true");
                separator.textContent = "•";
                time.dateTime = item.date;
                time.textContent = formattedDate;
                metadata.append(separator, time);
            }
        }

        excerpt.className = "search-result-excerpt";
        excerpt.append(highlightedFragment(item.content || "", contentHighlightRanges, bounds[0], bounds[1]));

        article.append(title, metadata, excerpt);
        listItem.append(article);
        return listItem;
    }

    function countByType(searchResults) {
        return searchResults.reduce((counts, result) => {
            counts.All += 1;
            if (Object.prototype.hasOwnProperty.call(counts, result.item.type)) {
                counts[result.item.type] += 1;
            }
            return counts;
        }, { All: 0, Blog: 0, Ancestry: 0, Page: 0 });
    }

    function updateFilters(searchResults) {
        const counts = countByType(searchResults);

        filters.querySelectorAll("[data-search-type]").forEach((button) => {
            const type = button.dataset.searchType;
            const count = counts[type] || 0;
            const countElement = button.querySelector(".search-filter-count");
            const isActive = type === activeType;

            countElement.textContent = count.toLocaleString("en-US");
            button.classList.toggle("is-active", isActive);
            button.setAttribute("aria-pressed", isActive ? "true" : "false");
            button.disabled = type !== "All" && count === 0;
        });
    }

    function displayResults(query) {
        results.replaceChildren();
        failureMessage.hidden = true;

        const filteredResults = activeType === "All"
            ? currentResults
            : currentResults.filter((result) => result.item.type === activeType);
        const visibleResults = filteredResults.slice(0, resultLimit);
        const matchMode = fuzzyCheckbox.checked ? "fuzzy " : "exact ";
        const typeContext = activeType === "All" ? "" : `${activeType} `;
        const resultNoun = filteredResults.length === 1 ? "result" : "results";

        if (!filteredResults.length) {
            setInterfaceState("empty", `No ${matchMode}${typeContext}results found for “${query}”.`);
            filters.hidden = currentResults.length === 0;
            return;
        }

        const fragment = document.createDocumentFragment();
        visibleResults.forEach((result) => fragment.append(createResult(result, query)));
        results.append(fragment);
        emptyMessage.hidden = true;

        const limitContext = filteredResults.length > resultLimit
            ? ` Showing the first ${resultLimit}.`
            : "";
        setInterfaceState(
            "results",
            `${filteredResults.length.toLocaleString("en-US")} ${matchMode}${typeContext}${resultNoun} for “${query}”.${limitContext}`
        );
        filters.hidden = false;
    }

    function runSearch(options) {
        const settings = Object.assign({ updateHistory: true, resetType: true }, options);
        const query = input.value.trim();
        const fuzzyEnabled = fuzzyCheckbox.checked;

        clearButton.hidden = query.length === 0;
        if (settings.updateHistory) {
            updateUrl(query, fuzzyEnabled);
        }

        if (!exactFuse || !fuzzyFuse) {
            return;
        }

        if (!query) {
            currentResults = [];
            activeType = "All";
            results.replaceChildren();
            emptyMessage.hidden = true;
            setInterfaceState("idle", `Ready to search ${searchIndex.length.toLocaleString("en-US")} pages and posts.`);
            return;
        }

        if (settings.resetType) {
            activeType = "All";
        }
        currentResults = (fuzzyEnabled ? fuzzyFuse : exactFuse).search(query);
        updateFilters(currentResults);
        displayResults(query);
    }

    function scheduleSearch() {
        window.clearTimeout(debounceTimer);
        if (!input.value.trim()) {
            runSearch();
            return;
        }
        debounceTimer = window.setTimeout(runSearch, debounceDelay);
    }

    async function loadSearchIndex() {
        setInterfaceState("loading", "Loading the search index…");
        results.replaceChildren();

        try {
            if (typeof window.Fuse !== "function") {
                throw new Error("Fuse.js did not load.");
            }

            const response = await window.fetch(indexUrl, { credentials: "same-origin" });
            if (!response.ok) {
                throw new Error(`Search index returned ${response.status}.`);
            }

            const data = await response.json();
            if (!Array.isArray(data) || !data.length) {
                throw new Error("Search index is empty or invalid.");
            }

            searchIndex = data.map(normalizeItem).filter((item) => item.uri);
            if (!searchIndex.length) {
                throw new Error("Search index contains no usable entries.");
            }
            const commonFuseOptions = {
                keys: [
                    { name: "title", weight: 5 },
                    { name: "content", weight: 1 }
                ],
                includeMatches: true,
                ignoreLocation: true
            };
            exactFuse = new window.Fuse(searchIndex, Object.assign({}, commonFuseOptions, {
                threshold: 0
            }));
            fuzzyFuse = new window.Fuse(searchIndex, Object.assign({}, commonFuseOptions, {
                threshold: 0.15
            }));

            runSearch({ updateHistory: false });
        } catch (error) {
            console.error("Search index failed to load:", error);
            results.replaceChildren();
            setInterfaceState("failure", "Search is temporarily unavailable.");
        }
    }

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        window.clearTimeout(debounceTimer);
        runSearch();
    });

    form.addEventListener("reset", () => {
        window.setTimeout(() => {
            window.clearTimeout(debounceTimer);
            runSearch();
            input.focus();
        }, 0);
    });

    input.addEventListener("input", scheduleSearch);

    fuzzyCheckbox.addEventListener("change", () => {
        window.clearTimeout(debounceTimer);
        runSearch();
    });

    filters.addEventListener("click", (event) => {
        const button = event.target.closest("[data-search-type]");
        if (!button || button.disabled) {
            return;
        }

        activeType = button.dataset.searchType;
        updateFilters(currentResults);
        displayResults(input.value.trim());
    });

    retryButton.addEventListener("click", loadSearchIndex);

    window.addEventListener("popstate", () => {
        input.value = queryFromUrl();
        fuzzyCheckbox.checked = fuzzyFromUrl();
        runSearch({ updateHistory: false });
    });

    input.value = queryFromUrl();
    fuzzyCheckbox.checked = fuzzyFromUrl();
    clearButton.hidden = input.value.trim().length === 0;
    loadSearchIndex();
})(document, window);
