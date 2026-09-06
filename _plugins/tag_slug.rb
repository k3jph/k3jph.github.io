# frozen_string_literal: true

# Normalize jekyll-tagging paths with Jekyll's standard slug rules.
#
# jekyll-tagging preserves URL-significant punctuation such as '/', '?' and
# apostrophes in generated tag paths. Use Jekyll's normal slug rules for both
# generated tag pages and the gem's `tag_url` Liquid filter instead.
module Jekyll
  # Extends the URL helpers used by jekyll-tagging.
  module Helpers
    def jekyll_tagging_slug(tag)
      Jekyll::Utils.slugify(tag.to_s, mode: 'default', cased: false)
    end
  end
end
