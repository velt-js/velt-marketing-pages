import os, re, glob

html_files = glob.glob('pages-html/**/index.html', recursive=True) + glob.glob('pages-html/404.html')
print(f'Found {len(html_files)} HTML files')

pattern = re.compile(r'https://fonts\.gstatic\.com/s/([^/]+)/[^/]+/([^)"\'\s]+)')

total_replacements = 0
files_changed = 0

for filepath in html_files:
    with open(filepath, 'r') as f:
        content = f.read()

    new_content, count = pattern.subn(r'/fonts/\1/\2', content)

    if count > 0:
        with open(filepath, 'w') as f:
            f.write(new_content)
        total_replacements += count
        files_changed += 1

print(f'Rewrote {total_replacements} URLs across {files_changed} files')
