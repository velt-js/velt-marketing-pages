import re, glob

html_files = glob.glob('pages-html/**/index.html', recursive=True) + ['pages-html/404.html']
print(f'Processing {len(html_files)} HTML files')

# Rewrite framerusercontent.com/sites/<siteId>/<file>.mjs to /framer-runtime/<file>.mjs
pattern = re.compile(r'https://framerusercontent\.com/sites/[^/]+/([A-Za-z0-9_\-\.]+\.mjs)')

total_replacements = 0
files_changed = 0

for filepath in html_files:
    try:
        with open(filepath, 'r') as f:
            content = f.read()
    except:
        continue

    new_content, count = pattern.subn(r'/framer-runtime/\1', content)

    if count > 0:
        with open(filepath, 'w') as f:
            f.write(new_content)
        total_replacements += count
        files_changed += 1

print(f'Rewrote {total_replacements} .mjs URLs across {files_changed} files')
