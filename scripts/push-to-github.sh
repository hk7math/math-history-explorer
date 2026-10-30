#!/usr/bin/env bash
set -euo pipefail

# Push this repository to GitHub. Requires the GitHub CLI (`gh`) and `gh auth login`.
#
# Usage:
#   ./scripts/push-to-github.sh
#   ./scripts/push-to-github.sh shepherd-ng/math-history-explorer
#
# Default repo: hk7math/math-history-explorer (private).

REPO="${1:-hk7math/math-history-explorer}"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

if ! command -v gh >/dev/null 2>&1; then
  echo "Install the GitHub CLI first: https://cli.github.com/" >&2
  exit 1
fi

if ! gh auth status >/dev/null 2>&1; then
  echo "Run: gh auth login" >&2
  exit 1
fi

if gh repo view "$REPO" >/dev/null 2>&1; then
  echo "GitHub repo already exists: https://github.com/$REPO"
else
  gh repo create "$REPO" --private --description "Mathematics history as a Gource-style repository"
fi

if git remote get-url github >/dev/null 2>&1; then
  git remote set-url github "https://github.com/$REPO.git"
else
  git remote add github "https://github.com/$REPO.git"
fi

git push -u github main
echo "Pushed main to https://github.com/$REPO"
