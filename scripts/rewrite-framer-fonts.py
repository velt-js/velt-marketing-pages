import re, glob

html_files = glob.glob('pages-html/**/index.html', recursive=True) + ['pages-html/404.html']
print(f'Processing {len(html_files)} HTML files')

pattern = re.compile(r'https://framerusercontent\.com/assets/([A-Za-z0-9_\-]+\.woff2)')

total_replacements = 0
files_changed = 0

for filepath in html_files:
    try:
        with open(filepath, 'r') as f:
            content = f.read()
    except:
        continue

    new_content, count = pattern.subn(r'/fonts/framer/\1', content)

    if count > 0:
        with open(filepath, 'w') as f:
            f.write(new_content)
        total_replacements += count
        files_changed += 1

print(f'Rewrote {total_replacements} URLs across {files_changed} files')
