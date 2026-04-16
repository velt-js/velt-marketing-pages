#!/bin/bash
set -e
cd "$(dirname "$0")/.."

mkdir -p public/images

# Extract unique image URLs
python3 -c "
import re, glob
urls = set()
for f in glob.glob('pages-html/**/index.html', recursive=True) + ['pages-html/404.html']:
    try:
        content = open(f).read()
    except:
        continue
    for m in re.finditer(r'https://framerusercontent\.com/images/[A-Za-z0-9_\-]+\.[a-z]+', content):
        urls.add(m.group(0))
for u in sorted(urls):
    print(u)
" > /tmp/image-urls.txt

TOTAL=$(wc -l < /tmp/image-urls.txt)
echo "Downloading $TOTAL images..."

COUNT=0
while IFS= read -r url; do
    filename="${url##*/images/}"
    if [ ! -f "public/images/$filename" ]; then
        curl -sL -o "public/images/$filename" "$url" &
    fi
    COUNT=$((COUNT + 1))
    # Run 30 parallel downloads at a time
    if [ $((COUNT % 30)) -eq 0 ]; then
        wait
        echo "  $COUNT / $TOTAL"
    fi
done < /tmp/image-urls.txt
wait

DOWNLOADED=$(ls public/images | wc -l)
echo "Done: $DOWNLOADED files in public/images/"
