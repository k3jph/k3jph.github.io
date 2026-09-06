#!/usr/bin/env ruby
# frozen_string_literal: true

require 'html-proofer'

site_dir = File.expand_path('../_site', __dir__)
abort("Generated site not found at #{site_dir}. Run `bundle exec rake build` first.") unless Dir.exist?(site_dir)

external_url = %r{\A(?:https?:)?//(?!(?:www\.)?jameshoward\.us(?:[/:]|\z))}

options = {
  check_internal_hash: true,
  disable_external: true,
  enforce_https: false,
  ignore_missing_alt: true,
  ignore_urls: [external_url],
  swap_urls: {
    %r{\Ahttps?://(?:www\.)?jameshoward\.us(?=/|\z)} => '',
    %r{\A//(?:www\.)?jameshoward\.us(?=/|\z)} => '',
    %r{\A/cdn-cgi/image/[^/]+/} => '/'
  }
}

puts "Validating internal links and local resources in #{site_dir}..."
HTMLProofer.check_directory(site_dir, options).run
