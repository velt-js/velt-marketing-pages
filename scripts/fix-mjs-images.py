import re, glob, os, subprocess

# Find all image URLs in .mjs files
urls = set()
for f in glob.glob('public/framer-runtime/*.mjs'):
    content = open(f).read()
    for m in re.finditer(r'https://framerusercontent\.com/images/[A-Za-z0-9_\-]+\.[a-z]+', content):
        urls.add(m.group(0))

# Download missing ones
missing = []
for u in urls:
    fname = u.split('/images/')[-1]
    if not os.path.exists(f'public/images/{fname}'):
        missing.append((u, fname))

print(f'{len(missing)} missing images to download')
for i in range(0, len(missing), 30):
    batch = missing[i:i+30]
    procs = []
    for url, fname in batch:
        p = subprocess.Popen(['curl', '-sL', '-o', f'public/images/{fname}', url])
        procs.append(p)
    for p in procs:
        p.wait()
    print(f'  {min(i+30, len(missing))} / {len(missing)}')

# Now rewrite URLs in all .mjs files
pattern = re.compile(r'https://framerusercontent\.com/images/([A-Za-z0-9_\-]+\.[a-z]+)')
total = 0
for f in glob.glob('public/framer-runtime/*.mjs'):
    content = open(f).read()
    new_content, count = pattern.subn(r'/images/\1', content)
    if count > 0:
        open(f, 'w').write(new_content)
        total += count

print(f'Rewrote {total} image URLs across .mjs files')
