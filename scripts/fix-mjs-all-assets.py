import re, glob, os, subprocess

# Find ALL framerusercontent URLs in .mjs files (assets, third-party-assets, etc.)
urls = set()
for f in glob.glob('public/framer-runtime/*.mjs'):
    content = open(f).read()
    # Match full URLs with file extensions
    for m in re.finditer(r'https://framerusercontent\.com/(?:assets|third-party-assets)/[A-Za-z0-9_\-/]+\.[a-z0-9]+', content):
        urls.add(m.group(0))

print(f'Found {len(urls)} unique asset URLs in .mjs files')

# Categorize
from collections import Counter
exts = Counter()
for u in urls:
    ext = u.rsplit('.', 1)[-1]
    exts[ext] += 1
for ext, count in exts.most_common():
    print(f'  .{ext}: {count}')

# Download to public/assets/ with flattened names
os.makedirs('public/assets', exist_ok=True)

def url_to_local(url):
    # Strip the base, flatten path
    path = url.replace('https://framerusercontent.com/assets/', '')
    path = url.replace('https://framerusercontent.com/third-party-assets/', 'tp__') if '/third-party-assets/' in url else path
    if '/third-party-assets/' in url:
        path = url.replace('https://framerusercontent.com/third-party-assets/', '')
        path = 'tp__' + path.replace('/', '__')
    else:
        path = url.replace('https://framerusercontent.com/assets/', '')
    return path

missing = []
for u in urls:
    local_name = url_to_local(u)
    local_path = f'public/assets/{local_name}'
    if not os.path.exists(local_path):
        missing.append((u, local_path))

print(f'{len(missing)} missing files to download')

for i in range(0, len(missing), 30):
    batch = missing[i:i+30]
    procs = []
    for url, local_path in batch:
        p = subprocess.Popen(['curl', '-sL', '-o', local_path, url])
        procs.append(p)
    for p in procs:
        p.wait()
    print(f'  {min(i+30, len(missing))} / {len(missing)}')

# Now rewrite in .mjs files
total = 0
for f in glob.glob('public/framer-runtime/*.mjs'):
    content = open(f).read()
    new_content = content
    for u in urls:
        local_name = url_to_local(u)
        local_url = f'/assets/{local_name}'
        if u in new_content:
            new_content = new_content.replace(u, local_url)
    if new_content != content:
        open(f, 'w').write(new_content)
        total += 1

print(f'Rewrote URLs in {total} .mjs files')

# Check remaining
remaining = 0
for f in glob.glob('public/framer-runtime/*.mjs'):
    remaining += open(f).read().count('framerusercontent.com')
print(f'Remaining framerusercontent refs in .mjs: {remaining}')
