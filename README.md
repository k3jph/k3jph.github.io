# JamesHoward.us — Developer Guide

This repository powers **[jameshoward.us](https://jameshoward.us)** using [Jekyll](https://jekyllrb.com/) and a modern Ruby-based build system.
It is optimized for both local development and automated deployment to GitHub Pages.

---

## 🚀 Environment Overview

| Environment     | Config Files                     | Description                                                                                   |
| --------------- | -------------------------------- | --------------------------------------------------------------------------------------------- |
| **Production**  | `_config.yml`                    | Optimized build with minification, responsive WebP images, and all plugins enabled.           |
| **Development** | `_config.yml`, `_config_dev.yml` | Fast local preview build with incremental regeneration, live reload, and uncompressed assets. |

Ruby **3.4.2** and Jekyll **4.3.3** are required.

---

## 🪙 Setup

1. **Install Ruby 3.4.2** (recommended via `rbenv` or `rvm`).
2. **Install dependencies:**

   ```bash
   bundle install --with development
   ```
3. **Verify your environment:**

   ```bash
   rake env
   ```

---

## 🧪 Development Workflow

| Task                       | Command                                                               | Notes                                                                                         |
| -------------------------- | --------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| Serve locally              | `rake serve`                                                          | Uses `_config.yml` + `_config_dev.yml`. Includes drafts, incremental builds, and live reload. |
| Quick preview              | `rake serve` then open [http://localhost:4000](http://localhost:4000) | Site auto-rebuilds on save.                                                                   |
| Clean build artifacts      | `rake clean`                                                          | Removes `_site`, `.jekyll-cache`, `.sass-cache`.                                              |
| Check site health          | `rake check`                                                          | Runs `jekyll doctor` for config sanity.                                                       |
| Validate output HTML/links | `bundle exec htmlproofer ./_site`                                     | Optional — checks for broken links.                                                           |

---

## 🎗️ Production Build

| Task                | Command                    | Notes                                         |
| ------------------- | -------------------------- | --------------------------------------------- |
| Full build          | `rake build`               | Builds `_site` using `_config.yml` only.      |
| Clean + rebuild     | `rake clean && rake build` | Recommended before deployment.                |
| Ping search engines | `rake ping`                | Notifies Google and Bing of updated sitemaps. |

GitHub Actions automatically runs these steps and deploys to Pages whenever `main` is updated.

---

## 🖼️ Media & Images

All site images are stored under `assets/img/`.

The site uses **jekyll-picture-tag** for responsive WebP output.

Use the existing `{% include figure.html %}` macro to insert images with captions and layout options.

Example:

```liquid
{% include figure.html
   image="news/example.webp"
   placement="right"
   width="50"
   alt="Example alt text"
   cap="An example figure" %}
```

In production, this generates responsive `<picture>` tags automatically.
In development, only a single preview size is built for speed.

---

## ✨ Table of Contents & Minifier

**jekyll-toc** automatically generates in-page TOCs.
Add `{% toc %}` or `{{ content | toc }}` in your layouts or posts.

**jekyll-minifier** compresses HTML, CSS, and JS in production builds.

---

## 🔧 GitHub Actions

The workflow file is located at:

```
.github/workflows/jekyll.yml
```

It:

* Uses Ruby **3.4.2**
* Builds via `bundle exec rake build`
* Deploys automatically to GitHub Pages on push to `main`
* Runs nightly (cron: `0 9 * * *`)

---

## 🪟 Housekeeping

| Task                               | Command                                |
| ---------------------------------- | -------------------------------------- |
| Remove generated responsive images | `rake clean_images`                    |
| Remove cached gems                 | `rm -rf vendor/ .bundle/ Gemfile.lock` |
| Reinstall everything clean         | `bundle install --with development`    |

---

## 🏁 Summary

This project structure provides:

* Clean separation of development and production environments.
* Responsive image generation with WebP.
* Automatic minification and sitemap pings.
* Integrated Rake automation for simple operation.

To start a new post:

```bash
rake post:new["My New Article"]
```

Then edit `_posts/YYYY-MM-DD-my-new-article.md`.

---

**Author:** James P. Howard II, PhD
**Website:** [https://jameshoward.us](https://jameshoward.us)
