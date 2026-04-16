import glob

html_files = glob.glob('pages-html/**/index.html', recursive=True) + glob.glob('pages-html/404.html')
count = 0

for filepath in html_files:
    with open(filepath, 'r') as f:
        content = f.read()

    new_content = content.replace(
        '\t<link href="https://fonts.gstatic.com" rel="preconnect" crossorigin>\n', ''
    )

    if new_content != content:
        with open(filepath, 'w') as f:
            f.write(new_content)
        count += 1

print(f'Removed preconnect from {count} files')
