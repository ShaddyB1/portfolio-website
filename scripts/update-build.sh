#!/usr/bin/env bash
# Refreshes the "last shipped" tag in index.html between the
# <!-- BUILD:BEGIN --> / <!-- BUILD:END --> markers.
#
# Uses:
#   - short SHA from HEAD (falls back to "dev" if not a git checkout)
#   - commit date of HEAD in YYYY-MM-DD (falls back to today)
#
# Called by the pre-commit hook, but safe to run manually:
#   bash scripts/update-build.sh
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
FILE="$ROOT/index.html"

if [ ! -f "$FILE" ]; then
  echo "update-build: $FILE not found" >&2
  exit 1
fi

if git -C "$ROOT" rev-parse --git-dir >/dev/null 2>&1; then
  HASH="$(git -C "$ROOT" rev-parse --short HEAD 2>/dev/null || echo dev)"
  DATE="$(git -C "$ROOT" log -1 --format=%cs HEAD 2>/dev/null || date +%Y-%m-%d)"
else
  HASH="dev"
  DATE="$(date +%Y-%m-%d)"
fi

REPO_URL="https://github.com/ShaddyB1/portfolio-website/commit/${HASH}"

python3 - "$FILE" "$HASH" "$DATE" "$REPO_URL" <<'PY'
import re, sys, pathlib
path, hsh, date, url = sys.argv[1:5]
p = pathlib.Path(path)
src = p.read_text(encoding="utf-8")

new_block = (
    "<!-- BUILD:BEGIN -->\n"
    "            <a id=\"status-build\"\n"
    f"               href=\"{url}\"\n"
    "               target=\"_blank\" rel=\"noopener\"\n"
    f"               data-date=\"{date}\" data-hash=\"{hsh}\"\n"
    f"               style=\"color:var(--color-text-primary);text-decoration:none;\">{date} · {hsh}</a>\n"
    "            <!-- BUILD:END -->"
)

pattern = re.compile(r"<!-- BUILD:BEGIN -->.*?<!-- BUILD:END -->", re.DOTALL)
if not pattern.search(src):
    print("update-build: BUILD markers not found; skipping.", file=sys.stderr)
    sys.exit(0)

updated = pattern.sub(new_block, src, count=1)
if updated != src:
    p.write_text(updated, encoding="utf-8")
    print(f"update-build: index.html -> {date} · {hsh}")
else:
    print("update-build: no change needed.")
PY
