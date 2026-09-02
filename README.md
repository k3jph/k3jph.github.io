# JamesHoward.us — Developer Guide

This repository powers **[jameshoward.us](https://jameshoward.us)** using [Jekyll](https://jekyllrb.com/) and a modern Ruby-based build system.
It is optimized for both local development and automated deployment to GitHub Pages.

---

## 🚀 Environment Overview

| Environment     | Config Files                     | Description                                                                                   |
| --------------- | -------------------------------- | --------------------------------------------------------------------------------------------- |
| **Production**  | `_config.yml`                    | Optimized build with minification and Cloudflare responsive-image URLs.                        |
| **Development** | `_config.yml`, `_config_dev.yml` | Fast local preview with original images, live reload, and uncompressed assets.                 |

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

GitHub Actions automatically runs these steps and deploys to Pages whenever `main` is updated.

---

## 🖼️ Media & Images

Most site images are stored under `assets/img/`.

Production HTML uses Cloudflare Image Transformations for responsive widths and automatic browser-format selection. Local development serves the original image files directly, so preview builds do not depend on Cloudflare or generate derivatives.

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

In production, this generates a responsive `srcset` using the widths in `_data/cloudflare_images.yml`. In development, it emits a single `<img>` pointing to the original asset.

The Cloudflare zone must have **Images → Transformations** enabled. The recommended cache rule for `/assets/img/*` overrides both Edge TTL and Browser TTL to 35 days (`3,024,000` seconds). Changing an image without changing its filename requires purging the original image URL, which also purges its transformed variants.

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
| Remove cached gems                 | `rm -rf vendor/ .bundle/ Gemfile.lock` |
| Reinstall everything clean         | `bundle install --with development`    |

---

## 🏁 Summary

This project structure provides:

* Clean separation of development and production environments.
* Responsive image delivery through Cloudflare Image Transformations.
* Automatic minification.
* Integrated Rake automation for simple operation.

To start a new post:

```bash
rake post:new["My New Article"]
```

Then edit `_posts/YYYY-MM-DD-my-new-article.md`.

---

**Author:** James P. Howard II, PhD
**Website:** [https://jameshoward.us](https://jameshoward.us)
