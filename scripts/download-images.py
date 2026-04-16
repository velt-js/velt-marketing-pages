import re, glob, os, subprocess

# Extract all unique base image URLs
urls = set()
for f in glob.glob('pages-html/**/index.html', recursive=True) + ['pages-html/404.html']:
    try:
        content = open(f).read()
    except:
        continue
    for m in re.finditer(r'https://framerusercontent\.com/images/[A-Za-z0-9_\-]+\.[a-z]+', content):
        urls.add(m.group(0))

print(f'Found {len(urls)} unique images to download')

os.makedirs('public/images', exist_ok=True)

# Write URL list for xargs parallel download
with open('/tmp/image-urls.txt', 'w') as f:
    for url in sorted(urls):
        filename = url.split('/images/')[-1]
        f.write(f'{url}\n  -o\n  public/images/{filename}\n')

print('Downloading with curl...')
result = subprocess.run(
    ['curl', '--parallel', '--parallel-max', '20', '-sL', '-K', '/tmp/image-urls.txt'],
    capture_output=True, text=True
)

# Count downloaded
downloaded = len([f for f in os.listdir('public/images') if os.path.isfile(f'public/images/{f}')])
print(f'Downloaded {downloaded} files')
