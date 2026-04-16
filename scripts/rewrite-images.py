import re, glob

html_files = glob.glob('pages-html/**/index.html', recursive=True) + ['pages-html/404.html']
print(f'Processing {len(html_files)} HTML files')

# Replace https://framerusercontent.com/images/<hash>.<ext> with /images/<hash>.<ext>
# Preserves any query params that follow
pattern = re.compile(r'https://framerusercontent\.com/images/([A-Za-z0-9_\-]+\.[a-z]+)')

total_replacements = 0
files_changed = 0

for filepath in html_files:
    try:
        with open(filepath, 'r') as f:
            content = f.read()
    except:
        continue

    new_content, count = pattern.subn(r'/images/\1', content)

    if count > 0:
        with open(filepath, 'w') as f:
            f.write(new_content)
        total_replacements += count
        files_changed += 1

print(f'Rewrote {total_replacements} image URLs across {files_changed} files')
