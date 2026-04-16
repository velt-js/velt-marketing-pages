import re, glob

html_files = glob.glob('pages-html/**/index.html', recursive=True) + ['pages-html/404.html']

# Read the URL list
with open('/tmp/remaining-assets.txt') as f:
    urls = [l.strip() for l in f if l.strip()]

# Build mapping: original URL -> local path
url_map = {}
for url in urls:
    if '/third-party-assets/' in url:
        filename = url.replace('https://framerusercontent.com/third-party-assets/', '').replace('/', '__')
    else:
        filename = url.replace('https://framerusercontent.com/assets/', '').replace('/', '__')
    url_map[url] = f'/assets/{filename}'

print(f'Processing {len(html_files)} HTML files, {len(url_map)} URL mappings')

total_replacements = 0
files_changed = 0

for filepath in html_files:
    try:
        with open(filepath, 'r') as f:
            content = f.read()
    except:
        continue

    new_content = content
    count = 0
    for old_url, new_path in url_map.items():
        if old_url in new_content:
            new_content = new_content.replace(old_url, new_path)
            count += 1

    if count > 0:
        with open(filepath, 'w') as f:
            f.write(new_content)
        total_replacements += count
        files_changed += 1

print(f'Rewrote URLs in {files_changed} files ({total_replacements} unique URL replacements applied)')
