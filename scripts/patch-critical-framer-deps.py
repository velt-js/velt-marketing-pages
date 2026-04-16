import re

# =============================================================================
# 1a. Patch script_main — Remove editor init dynamic import
# =============================================================================
fname = "public/framer-runtime/script_main.L2sIMFJ0.mjs"
content = open(fname).read()

# Replace: await import(`https://framer.com/edit/init.mjs`)
# With: a no-op that returns an empty module
content = content.replace(
    'await import(`https://framer.com/edit/init.mjs`)',
    'await Promise.resolve({createEditorBar:()=>()=>null})'
)

# Strip telemetry identifiers - replace framerSiteId value
# These are harmless but waste bandwidth on failed requests
content = content.replace('framer:pageview', 'noop:pageview')

open(fname, 'w').write(content)
print(f"1a. Patched {fname} — editor init + telemetry")


# =============================================================================
# 1b. Patch Embed — Bypass iframe URL check
# =============================================================================
fname = "public/framer-runtime/Embed.JmVC7i70.mjs"
content = open(fname).read()

# The pattern is:
# async function n(){let n=await fetch(`https://api.framer.com/functions/check-iframe-url?url=`+encodeURIComponent(e));...}
# Replace the fetch call with a direct "not blocked" result
old = 'let n=await fetch(`https://api.framer.com/functions/check-iframe-url?url=`+encodeURIComponent(e));if(n.status==200){let{isBlocked:e}=await n.json();t&&d(e)}else{let e=await n.text();console.error(e),d(Error(`This site can\'t be reached.`))}'
new = 't&&d(false)'

if old in content:
    content = content.replace(old, new)
    print(f"1b. Patched {fname} — iframe check bypassed (exact match)")
else:
    # Try a regex approach
    pattern = r'let n=await fetch\(`https://api\.framer\.com/functions/check-iframe-url\?url=`\+encodeURIComponent\(e\)\);.*?d\(Error\(`This site can\'t be reached\.`\)\)\}'
    new_content = re.sub(pattern, 't&&d(false)', content)
    if new_content != content:
        content = new_content
        print(f"1b. Patched {fname} — iframe check bypassed (regex)")
    else:
        print(f"1b. WARNING: Could not patch {fname} — manual edit needed")

open(fname, 'w').write(content)


# =============================================================================
# 1c. Patch Icon CDN URLs — Replace with no-op imports
# =============================================================================
icon_files = [
    ("public/framer-runtime/Hero.B1hsOKnN.mjs", "https://framer.com/m/hero-icons/"),
    ("public/framer-runtime/shared-lib.DyfhfRlb.mjs", "https://framer.com/m/feather-icons/"),
    ("public/framer-runtime/kgkC3paof.C6JvCIlz.mjs", "https://framer.com/m/iconoir-icons/"),
]

for fname, url in icon_files:
    content = open(fname).read()
    # The icon modules use: import(`${BASE_URL}${iconName}.js@version`)
    # When this fails, the catch block sets the icon to null and a placeholder renders
    # The safest fix: replace the URL with a data: URI that returns an empty module
    # This makes the import() resolve immediately with a null default export
    # Actually simpler: just replace the base URL with a non-existent local path
    # The import will fail, hit the catch block, and render the fallback (which is already handled)
    # But even better: the Home icon is already pre-rendered as inline SVG in the file (variable b)
    # So we just need the import to fail gracefully.
    # The code already has try/catch: try{let e=await import(...)...}catch{...D(null)}
    # So a failed import just means no icon renders. Let's make it fail fast with a local path.
    content = content.replace(url, '/icons/noop/')
    open(fname, 'w').write(content)
    print(f"1c. Patched {fname} — icon URL redirected to local noop")


# =============================================================================
# 2. Rewrite remaining framerusercontent.com URLs in MJS files
# =============================================================================
import glob

mjs_files = glob.glob('public/framer-runtime/*.mjs')
total_rewrites = 0

for fname in mjs_files:
    content = open(fname).read()
    # Replace module identity URLs
    new_content = re.sub(
        r'https://framerusercontent\.com/modules/[^"\'`\s,);]+',
        '/framer-modules/noop',
        content
    )
    # Replace any remaining third-party-assets fontshare URL
    new_content = re.sub(
        r'https://framerusercontent\.com/third-party-assets/[^"\'`\s,);]+',
        '/fonts/framer/noop',
        new_content
    )
    if new_content != content:
        open(fname, 'w').write(new_content)
        total_rewrites += 1

print(f"2. Rewrote framerusercontent.com URLs in {total_rewrites} MJS files")


# =============================================================================
# Verify
# =============================================================================
remaining = 0
for fname in glob.glob('public/framer-runtime/*.mjs'):
    content = open(fname).read()
    remaining += content.count('framerusercontent.com')
    remaining += content.count('framer.com/m/')
    remaining += content.count('framer.com/edit/')
    remaining += content.count('api.framer.com')

print(f"\nRemaining critical framer refs in MJS: {remaining}")

# Count informational-only refs (not functional)
info_only = 0
for fname in glob.glob('public/framer-runtime/*.mjs'):
    content = open(fname).read()
    info_only += content.count('www.framer.com/contact')
    info_only += content.count('www.framer.com/api/animation')
    info_only += content.count('www.framer.com/help')
print(f"Informational-only refs (harmless): {info_only}")
