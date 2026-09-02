# frozen_string_literal: true

module Jekyll
  module CloudflareImages
    DEFAULT_QUALITY = 80
    DEFAULT_FIT = "scale-down"
    TRANSFORMABLE_EXTENSIONS = %w[.avif .gif .jpeg .jpg .png .webp].freeze

    def image_asset_path(input)
      path = input.to_s.strip
      return path if path.empty? || path.match?(%r{\A(?:https?:)?//}) || path.start_with?("data:")

      path = "/#{path}" unless path.start_with?("/")
      path.start_with?("/assets/") ? path : "/assets/img#{path}"
    end

    def cloudflare_image_url(input, width = 800, quality = DEFAULT_QUALITY, fit = DEFAULT_FIT)
      source = image_asset_path(input)
      return source unless Jekyll.env == "production"
      return source if source.empty? || source.match?(%r{\A(?:https?:)?//}) || source.start_with?("data:")

      transformed_width = Integer(width)
      transformed_quality = Integer(quality)
      raise ArgumentError, "Cloudflare image width must be positive" unless transformed_width.positive?
      raise ArgumentError, "Cloudflare image quality must be between 1 and 100" unless (1..100).cover?(transformed_quality)

      options = [
        "fit=#{fit}",
        "width=#{transformed_width}",
        "quality=#{transformed_quality}",
        "format=auto",
        "onerror=redirect"
      ].join(",")

      "/cdn-cgi/image/#{options}#{source}"
    end

    def cloudflare_transformable_image(input)
      TRANSFORMABLE_EXTENSIONS.include?(File.extname(input.to_s.strip).downcase)
    end
  end
end

Liquid::Template.register_filter(Jekyll::CloudflareImages)
