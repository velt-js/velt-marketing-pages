import re, glob

html_files = glob.glob('public/pages-html/**/index.html', recursive=True) + ['public/pages-html/404.html']
print(f'Processing {len(html_files)} HTML files')

# Remove the old inline link rewrite script
inline_pattern = re.compile(
    r'\n<script>\n// Rewrite velt\.dev navigation.*?</script>\n',
    re.DOTALL
)

# Add script tag before </head>
total_removed = 0
total_added = 0

for filepath in html_files:
    try:
        with open(filepath, 'r') as f:
            content = f.read()
    except:
        continue

    new_content = content

    # Remove inline script
    new_content, c = inline_pattern.subn('', new_content)
    total_removed += c

    # Add external script tag before </head> if not already there
    if '/link-rewrite.js' not in new_content and '</head>' in new_content:
        new_content = new_content.replace('</head>', '<script src="/link-rewrite.js" defer></script>\n</head>')
        total_added += 1

    if new_content != content:
        with open(filepath, 'w') as f:
            f.write(new_content)

print(f'Removed {total_removed} inline scripts')
print(f'Added {total_added} script tags')
