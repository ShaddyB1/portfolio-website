#!/usr/bin/env bash
# Installs local git hooks by pointing core.hooksPath at scripts/hooks.
# Run once per clone:
#   bash scripts/install-hooks.sh
set -euo pipefail

ROOT="$(git rev-parse --show-toplevel)"
git -C "$ROOT" config core.hooksPath scripts/hooks
chmod +x "$ROOT"/scripts/hooks/* 2>/dev/null || true
echo "Hooks installed. Active hooks:"
ls -1 "$ROOT"/scripts/hooks
