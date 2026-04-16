import re

for fname, varname in [
    ("public/framer-runtime/Hero.B1hsOKnN.mjs", "T"),
    ("public/framer-runtime/shared-lib.DyfhfRlb.mjs", "qe"),
    ("public/framer-runtime/kgkC3paof.C6JvCIlz.mjs", "ze"),
]:
    content = open(fname).read()

    # Find the base URL assignment
    url_match = re.search(r'https://framer\.com/m/[a-z\-]+/', content)
    if url_match:
        base_url = url_match.group(0)
        print(f"\n=== {fname} ===")
        print(f"Base URL: {base_url}")

        # Find usages of this URL (concatenation patterns)
        # Look for patterns like: baseUrl + name + ".svg" or `${baseUrl}${name}.svg`
        for m in re.finditer(re.escape(base_url), content):
            start = max(0, m.start() - 10)
            end = min(len(content), m.end() + 150)
            ctx = content[start:end]
            print(f"Context: ...{ctx}...")
