#!/usr/bin/env ruby
# frozen_string_literal: true

require 'digest'
require 'fileutils'
require 'net/http'
require 'uri'

VNU_ASSET_URL = 'https://api.github.com/repos/validator/validator/releases/assets/546462581'
VNU_SHA256 = 'b37a0a67cde28d6a3b361f4c774cbd80fe3e1fde38824304e295c8d764296756'

site_dir = File.expand_path('../_site', __dir__)
cache_dir = File.expand_path('../.validator-cache', __dir__)
jar_path = File.join(cache_dir, 'vnu.jar')
excluded_html = File.join(site_dir, 'laserprj.html')

abort("Generated site not found at #{site_dir}. Run `bundle exec rake build` first.") unless Dir.exist?(site_dir)

unless system('java', '-version', out: File::NULL, err: File::NULL)
  abort('Java 17 or newer is required to run the Nu HTML Checker.')
end

def valid_vnu_jar?(path)
  File.file?(path) && Digest::SHA256.file(path).hexdigest == VNU_SHA256
end

# Keep redirect handling and streamed writing together so an incomplete download
# can never be mistaken for the verified checker artifact.
# rubocop:disable Metrics/AbcSize, Metrics/MethodLength
def download_vnu_jar(uri, destination, redirects_remaining = 5)
  raise 'Too many redirects while downloading the Nu HTML Checker.' if redirects_remaining.negative?

  request = Net::HTTP::Get.new(uri)
  if uri.host == 'api.github.com'
    request['Accept'] = 'application/octet-stream'
    request['X-GitHub-Api-Version'] = '2022-11-28'
  end

  Net::HTTP.start(uri.host, uri.port, use_ssl: uri.scheme == 'https') do |http|
    http.request(request) do |response|
      case response
      when Net::HTTPSuccess
        File.open(destination, 'wb') do |file|
          response.read_body { |chunk| file.write(chunk) }
        end
      when Net::HTTPRedirection
        location = response['location']
        raise 'Nu HTML Checker download redirected without a location.' unless location

        download_vnu_jar(URI.join(uri, location), destination, redirects_remaining - 1)
      else
        raise "Nu HTML Checker download returned HTTP #{response.code}."
      end
    end
  end
end
# rubocop:enable Metrics/AbcSize, Metrics/MethodLength

unless valid_vnu_jar?(jar_path)
  FileUtils.mkdir_p(cache_dir)
  temporary_path = "#{jar_path}.download"
  FileUtils.rm_f(temporary_path)

  begin
    puts 'Downloading the pinned Nu HTML Checker...'
    download_vnu_jar(URI(VNU_ASSET_URL), temporary_path)
  rescue StandardError => e
    FileUtils.rm_f(temporary_path)
    abort("Unable to download the Nu HTML Checker: #{e.message}")
  end

  unless valid_vnu_jar?(temporary_path)
    FileUtils.rm_f(temporary_path)
    abort('Nu HTML Checker download failed checksum verification.')
  end

  FileUtils.mv(temporary_path, jar_path)
end

html_files = Dir.glob(File.join(site_dir, '**', '*.html')).sort
html_files.delete(excluded_html)
abort("No generated HTML files found in #{site_dir}.") if html_files.empty?

puts "Validating #{html_files.length} generated HTML files with Nu HTML Checker..."
puts "Skipping markup validation for #{excluded_html} (documented legacy shortcut)."

command = [
  'java', '-Xss2m', '-jar', jar_path,
  '--errors-only', '--format', 'gnu', '--stdout',
  *html_files
]

exit 1 unless system(*command)
