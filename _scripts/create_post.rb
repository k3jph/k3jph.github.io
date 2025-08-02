#!/usr/bin/env ruby
require 'fileutils'
require 'date'

# Usage check
if ARGV.length < 2
  puts "Usage: ruby create_post.rb YYYY-MM-DD 'Post Title'"
  exit 1
end

# Parse arguments
date = Date.parse(ARGV[0])
title = ARGV[1]
year  = date.strftime('%Y')
month = date.strftime('%m')
day   = date.strftime('%d')

# Slugify title
slug = title.downcase.strip
            .gsub(/['"“”‘’]/, '')
            .gsub(/[^a-z0-9]+/, '-')
            .gsub(/^-+|-+$/, '')

# Prepare replacements
replacements = {
  '$slug$'  => slug,
  '$title$' => title,
  '$year$'  => year,
  '$month$' => month,
  '$day$'   => day
}

# Read template
template_path = '_templates/post.md'
unless File.exist?(template_path)
  puts "Template file not found at #{template_path}"
  exit 1
end

template = File.read(template_path)

# Replace placeholders
post_content = template.dup
replacements.each do |placeholder, value|
  post_content.gsub!(placeholder, value)
end

# Output path
output_dir = "_posts/#{year}"
FileUtils.mkdir_p(output_dir)
output_filename = "#{year}-#{month}-#{day}-#{slug}.md"
output_path = File.join(output_dir, output_filename)

# Write file
File.write(output_path, post_content)
puts "Created #{output_path}"
