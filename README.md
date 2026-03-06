# bigtrouble.net

My personal portfolio site, built as a static site on GitHub Pages.

Live at [bigtrouble.net](https://www.bigtrouble.net).

## About

This project had two goals: move my portfolio to something I fully own and control, and use the process to learn AI-assisted development in a real, structured way — not just prompting, but orchestrating the full workflow from planning to deployment.

The site itself is intentionally simple. Plain HTML and CSS, no frameworks, no build tools. The interesting part is how it was built.

## Stack

- **Markup & styling:** HTML5, CSS3, Google Fonts (Syne + Ubuntu Mono)
- **Hosting:** GitHub Pages with custom domain
- **AI development:** Claude Code CLI for local development, `CLAUDE.md` for persistent context
- **Automation:** GitHub Actions for auto-deploy on merge, Claude Code GitHub Action for PR review
- **CI:** HTML validation, CSS validation, link checking, and JS syntax checks on every PR
- **Documentation:** Notion, updated directly from Claude Code sessions via MCP

## How AI Was Used

The entire site was built using [Claude Code](https://docs.anthropic.com/en/docs/claude-code) as my primary development tool. I directed the architecture, design, and decisions — Claude Code handled code generation, file editing, and implementation.

A few specifics on the workflow:

- **`CLAUDE.md` as persistent context** — A project-level file that encodes design rules, conventions, and guardrails. Claude reads it at the start of every session, so it never needs to be re-briefed. It's kept intentionally short (~50 lines) and frames Claude as a collaborator that checks in before structural decisions, not an autonomous agent.
- **Feature branch workflow** — Every change goes through a branch, PR, and merge. Claude Code creates commits and branches but never pushes to `main` directly.
- **MCP integration** — Claude Code connects to Notion via MCP to read and update project documentation without leaving the terminal. Planning happens in Notion, execution happens in Claude Code, and both stay in sync.
- **Claude Code GitHub Action** — An automated PR reviewer that runs when `@claude` is mentioned in a PR comment. Restricted to maintainers only.
- **Phased build approach** — The project was planned and executed in phases (HTML skeleton, typography, layout, responsiveness, animations, deployment, CI, polish), each with its own feature branch and documentation.

## Security

Security was treated as a first-class concern, not an afterthought:

- **Branch protection** — `main` requires a PR with all CI checks passing. No direct pushes, no force pushes.
- **Content Security Policy** — A strict CSP meta tag blocks any resource not on an explicit allowlist (local scripts, Google Fonts, local images only).
- **SHA-pinned GitHub Actions** — All workflow action references use commit SHAs instead of floating version tags to prevent supply chain attacks via compromised tags.
- **CODEOWNERS** — Declares a required reviewer for all files, surfaced automatically on every PR.
- **Bot access control** — The `@claude` GitHub Action trigger is restricted to repository owners, members, and collaborators only.

## Project Structure

```
├── index.html        # Single-page portfolio
├── style.css         # All styles, CSS custom properties
├── nav.js            # Mobile navigation
├── animations.js     # Scroll-triggered SVG animations
├── marquee.js        # Scrolling text marquee
├── theme.js          # Dark/light mode toggle
├── assets/           # Images and static files
├── CLAUDE.md         # AI context and project rules
├── .github/          # GitHub Actions workflows
└── .mcp.json         # MCP server configuration
```
