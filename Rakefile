# Rakefile for Jekyll site
# Compatible with Ruby 3.4.2 and Bundler
# Matches Gemfile + GitHub Actions configuration

require "rake"
require "fileutils"

abort("✗ You must run this with Ruby 3.4.2!") unless RUBY_VERSION.start_with?("3.4.2")

JEKYLL_ENV = ENV["JEKYLL_ENV"] || "production"
CONFIG_FILE = JEKYLL_ENV == "development" ? "_config.yml,_config_dev.yml" : "_config.yml"

SITE_DIR = "_site"
CACHE_DIRS = [".jekyll-cache", ".sass-cache"]

def sh_with_env(command, environment = JEKYLL_ENV)
  puts "\n==> [#{environment}] Running: #{command}\n\n"
  system({ "JEKYLL_ENV" => environment }, command) || abort("\n✗ Command failed: #{command}")
end

desc "Build the site for the current environment"
task :build do
  sh_with_env("bundle exec jekyll build --config #{CONFIG_FILE}")
end

desc "Serve the site locally with drafts (development only)"
task :serve do
  sh_with_env(
    "bundle exec jekyll serve --config _config.yml,_config_dev.yml --future --drafts --incremental --livereload",
    "development"
  )
end

desc "Clean build and cache directories"
task :clean do
  puts "Cleaning build and cache directories..."
  FileUtils.rm_rf(SITE_DIR)
  CACHE_DIRS.each { |dir| FileUtils.rm_rf(dir) }
  puts "✓ Clean complete."
end

desc "Check Jekyll configuration and output directories"
task :check do
  puts "\nChecking Jekyll configuration..."
  sh_with_env("bundle exec jekyll doctor")
end

desc "Show Ruby, Bundler, and Jekyll versions"
task :env do
  puts "\n== Environment Info =="
  system("ruby -v")
  system("bundle -v")
  system("bundle exec jekyll -v")
  puts "JEKYLL_ENV=#{JEKYLL_ENV}"
  puts "Config file: #{CONFIG_FILE}"
end

desc "Create a post from template using: rake create_post YYYY-MM-DD \"Title of Post\""
task :create_post do
  if ARGV.length < 3
    puts "Usage: rake create_post YYYY-MM-DD \"Title of Post\""
    exit 1
  end

  date  = ARGV[1]
  title = ARGV[2..-1].join(" ")

  ruby_script = File.expand_path("_scripts/create_post.rb")
  unless File.exist?(ruby_script)
    raise "Script not found at #{ruby_script}"
  end

  exec("ruby", ruby_script, date, title)
end

task default: :build
