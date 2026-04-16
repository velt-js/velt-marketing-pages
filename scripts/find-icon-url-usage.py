import re

for fname in [
    "public/framer-runtime/Hero.B1hsOKnN.mjs",
    "public/framer-runtime/shared-lib.DyfhfRlb.mjs",
    "public/framer-runtime/kgkC3paof.C6JvCIlz.mjs",
]:
    content = open(fname).read()
    url = re.search(r'https://framer\.com/m/[a-z\-]+/', content).group(0)

    # Find the variable name assigned to this URL
    # Pattern: ,VARNAME=`url`,
    m = re.search(r',([A-Za-z_$][A-Za-z0-9_$]*)=`' + re.escape(url) + '`', content)
    if not m:
        m = re.search(r'([A-Za-z_$][A-Za-z0-9_$]*)=`' + re.escape(url) + '`', content)
    if m:
        varname = m.group(1)
        print(f"\n=== {fname} ===")
        print(f"URL: {url}")
        print(f"Variable: {varname}")

        # Now find all uses of this variable (not the assignment itself)
        for use in re.finditer(r'(?<!=)' + re.escape(varname) + r'(?=[+\[`(,\.])', content):
            ctx = content[max(0, use.start()-5):min(len(content), use.end()+100)]
            if url not in ctx:  # Skip the assignment
                print(f"  Usage: {ctx}")
