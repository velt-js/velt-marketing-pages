import re

# Look for how the icon base URL variable is used to make requests
for fname in [
    "public/framer-runtime/Hero.B1hsOKnN.mjs",
    "public/framer-runtime/shared-lib.DyfhfRlb.mjs",
    "public/framer-runtime/kgkC3paof.C6JvCIlz.mjs",
]:
    content = open(fname).read()

    # Find fetch() calls
    for m in re.finditer(r'fetch\([^)]{0,200}\)', content):
        ctx = content[max(0, m.start()-20):m.end()+20]
        if 'framer' in ctx.lower() or 'icon' in ctx.lower() or '/m/' in ctx:
            print(f"{fname}: {ctx}")

    # Find dynamic import() calls
    for m in re.finditer(r'import\([^)]{0,200}\)', content):
        ctx = content[max(0, m.start()-20):m.end()+20]
        if 'framer' in ctx.lower() or 'icon' in ctx.lower():
            print(f"{fname} import: {ctx}")

    # Find Image/src assignments using the URL variable
    # The URL is stored in T, qe, or ze - look for concatenation
    for pattern in [r'`\$\{[A-Za-z]+\}[^`]*\.svg`', r'[A-Za-z]+\+[^,;]+\.svg']:
        for m in re.finditer(pattern, content):
            ctx = content[max(0, m.start()-30):m.end()+30]
            print(f"{fname} concat: ...{ctx}...")
