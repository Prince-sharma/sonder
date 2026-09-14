#!/usr/bin/env bash
# Rebuilds both outputs from src/.  Run:  bash build.sh
set -e
cd "$(dirname "$0")"
PARTS="src/00-head.html src/01-shell.html src/10-data.js src/20-lib.js src/30-member.js src/40-admin.js src/41-admin2.js src/50-super.js src/60-handoff.js src/70-app.js"
mkdir -p dist

# 1. artifact body — carries no doctype/html/head/body; the Claude Artifact host wraps it
cat $PARTS > dist/artifact-body.html

# 2. standalone page — this is the one you double-click
cat > bench.html <<'EOHEAD'
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<style>:root{color-scheme:light dark}body{margin:0;font:14px system-ui,sans-serif}img{max-width:100%}[hidden]{display:none!important}</style>
</head>
<body>
EOHEAD
# access gate — deployment-only tag for the standalone page (not in dist/artifact-body.html)
printf '<script src="../../gate.js"></script>\n' >> bench.html
cat dist/artifact-body.html >> bench.html
printf '</body>\n</html>\n' >> bench.html

echo "built  bench.html                 $(wc -c < bench.html) bytes"
echo "built  dist/artifact-body.html    $(wc -c < dist/artifact-body.html) bytes"
