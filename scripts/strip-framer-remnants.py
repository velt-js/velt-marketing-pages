import re, glob

html_files = glob.glob('pages-html/**/index.html', recursive=True) + ['pages-html/404.html']
print(f'Processing {len(html_files)} HTML files')

# 1. Framer editor init script
editor_pattern = re.compile(
    r'\s*<script>try\{if\(localStorage\.get\("__framer_force_showing_editorbar_since"\)\).*?</script>',
    re.DOTALL
)

# 2. Generator meta tag
generator_pattern = re.compile(r'\s*<meta name="generator" content="Framer[^"]*">')

# 3. Framer HTML plugin meta tag
plugin_pattern = re.compile(r'\s*<meta name="framer-html-plugin" content="[^"]*">')

stats = {"editor": 0, "generator": 0, "plugin": 0}

for filepath in html_files:
    try:
        with open(filepath, 'r') as f:
            content = f.read()
    except:
        continue

    new_content = content

    new_content, c = editor_pattern.subn('', new_content)
    stats["editor"] += c

    new_content, c = generator_pattern.subn('', new_content)
    stats["generator"] += c

    new_content, c = plugin_pattern.subn('', new_content)
    stats["plugin"] += c

    if new_content != content:
        with open(filepath, 'w') as f:
            f.write(new_content)

print(f'Removed editor init scripts: {stats["editor"]}')
print(f'Removed generator meta tags: {stats["generator"]}')
print(f'Removed framer-html-plugin meta tags: {stats["plugin"]}')
