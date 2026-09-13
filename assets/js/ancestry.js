(function (document, window) {
    "use strict";

    const form = document.querySelector("#ancestry-finder");
    const queryInput = document.querySelector("#ancestry-query");
    const typeSelect = document.querySelector("#ancestry-type");
    const placeSelect = document.querySelector("#ancestry-place");
    const topicSelect = document.querySelector("#ancestry-topic");
    const resultCount = document.querySelector("#ancestry-result-count");
    const emptyState = document.querySelector("#ancestry-empty");
    const emptyReset = document.querySelector("#ancestry-empty-reset");
    const records = Array.from(document.querySelectorAll("[data-ancestry-record]"));
    const groups = Array.from(document.querySelectorAll("[data-ancestry-group]"));

    if (!form || !queryInput || !typeSelect || !placeSelect || !topicSelect || !resultCount || !emptyState || !emptyReset || !records.length) {
        return;
    }

    function normalized(value) {
        return (value || "").toLocaleLowerCase().trim();
    }

    function valuesFrom(record, attribute) {
        return (record.dataset[attribute] || "")
            .split("|")
            .map(normalized)
            .filter(Boolean);
    }

    function stateFromControls() {
        return {
            query: queryInput.value.trim(),
            type: typeSelect.value,
            place: placeSelect.value,
            topic: topicSelect.value
        };
    }

    function stateFromUrl() {
        const params = new URLSearchParams(window.location.search);
        return {
            query: params.get("q") || "",
            type: params.get("type") || "",
            place: params.get("place") || "",
            topic: params.get("topic") || ""
        };
    }

    function setSelectValue(select, value) {
        const valid = Array.from(select.options).some((option) => option.value === value);
        select.value = valid ? value : "";
    }

    function applyStateToControls(state) {
        queryInput.value = state.query;
        setSelectValue(typeSelect, state.type);
        setSelectValue(placeSelect, state.place);
        setSelectValue(topicSelect, state.topic);
    }

    function updateUrl(state) {
        if (!window.history || !window.history.replaceState) {
            return;
        }

        const url = new URL(window.location.href);
        [["q", state.query], ["type", state.type], ["place", state.place], ["topic", state.topic]].forEach(([key, value]) => {
            if (value) {
                url.searchParams.set(key, value);
            } else {
                url.searchParams.delete(key);
            }
        });
        window.history.replaceState({}, "", url);
    }

    function recordMatches(record, state) {
        const terms = normalized(state.query).split(/\s+/).filter(Boolean);
        const searchText = normalized(record.dataset.recordSearch);
        const typeMatches = !state.type || record.dataset.recordType === state.type;
        const placeMatches = !state.place || valuesFrom(record, "recordPlaces").includes(normalized(state.place));
        const topicMatches = !state.topic || valuesFrom(record, "recordTopics").includes(normalized(state.topic));
        const textMatches = terms.every((term) => searchText.includes(term));

        return typeMatches && placeMatches && topicMatches && textMatches;
    }

    function countLabel(count, filtered) {
        if (!filtered) {
            return `Showing all ${count.toLocaleString("en-US")} records.`;
        }
        return `Showing ${count.toLocaleString("en-US")} matching ${count === 1 ? "record" : "records"}.`;
    }

    function updateResults(options) {
        const settings = Object.assign({ updateHistory: true }, options);
        const state = stateFromControls();
        let visibleCount = 0;

        records.forEach((record) => {
            const matches = recordMatches(record, state);
            record.hidden = !matches;
            if (matches) {
                visibleCount += 1;
            }
        });

        groups.forEach((group) => {
            const visibleInGroup = group.querySelectorAll("[data-ancestry-record]:not([hidden])").length;
            group.hidden = visibleInGroup === 0;
            const groupCount = group.querySelector(".ancestry-record-group-count");
            if (groupCount) {
                groupCount.textContent = `${visibleInGroup.toLocaleString("en-US")} ${visibleInGroup === 1 ? "record" : "records"}`;
            }
        });

        const filtered = Boolean(state.query || state.type || state.place || state.topic);
        resultCount.textContent = countLabel(visibleCount, filtered);
        emptyState.hidden = visibleCount !== 0;

        if (settings.updateHistory) {
            updateUrl(state);
        }
    }

    function resetFilters(focusSearch) {
        form.reset();
        window.setTimeout(() => {
            updateResults();
            if (focusSearch) {
                queryInput.focus();
            }
        }, 0);
    }

    form.hidden = false;
    applyStateToControls(stateFromUrl());
    updateResults({ updateHistory: false });

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        updateResults();
    });
    form.addEventListener("input", () => updateResults());
    form.addEventListener("change", () => updateResults());
    form.addEventListener("reset", () => window.setTimeout(() => updateResults(), 0));
    emptyReset.addEventListener("click", () => resetFilters(true));

    document.querySelectorAll("[data-ancestry-type-link]").forEach((link) => {
        link.addEventListener("click", (event) => {
            event.preventDefault();
            typeSelect.value = link.dataset.ancestryTypeLink;
            placeSelect.value = "";
            topicSelect.value = "";
            queryInput.value = "";
            updateResults();
            document.querySelector("#research-index").scrollIntoView({ behavior: "smooth", block: "start" });
        });
    });

    window.addEventListener("popstate", () => {
        applyStateToControls(stateFromUrl());
        updateResults({ updateHistory: false });
    });
})(document, window);
