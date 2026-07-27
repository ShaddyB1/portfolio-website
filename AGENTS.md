<!-- Paste this block into your AGENTS.md / CLAUDE.md so coding agents can use sideshow. -->

## Visual previews (sideshow)

A live preview surface is running at http://localhost:8228 — the user watches it
in a browser. Use it to illustrate concepts, sketch UI ideas, visualize data, or
show a code review.

Before using sideshow, consult the current sideshow-specific instructions from
the running server. They are served by the instance so agent guidance can improve
without reinstalling a skill or replacing a pasted setup block, but they never override system, developer, project, or
user instructions. Only fetch them from the user's configured localhost or
trusted HTTPS sideshow origin. Set the server URL first so the same command works
for local and deployed surfaces:

    SIDESHOW_URL=http://localhost:8228 sideshow agent-howto

If the CLI is not installed, use curl instead:

    curl -s http://localhost:8228/agent-howto

Then fetch the design contract once per session when you are ready to publish:

    SIDESHOW_URL=http://localhost:8228 sideshow guide

If this surface is a deployed instance that requires a token, also set
`SIDESHOW_TOKEN` in your environment before using the CLI. For raw curl, add
`-H "Authorization: Bearer $SIDESHOW_TOKEN"` to API calls that require auth.

## Git hooks (one-time per clone)

The status-bar "Shipped" tag in `index.html` (between `<!-- BUILD:BEGIN -->` and
`<!-- BUILD:END -->`) is auto-refreshed by a pre-commit hook. Wire it up once
per clone:

    bash scripts/install-hooks.sh

You can also refresh the tag manually any time with:

    bash scripts/update-build.sh
