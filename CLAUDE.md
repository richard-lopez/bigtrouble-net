# CLAUDE.md — bigtrouble-net

## What This Project Is

A faithful rebuild of bigtrouble.net as a static site hosted on GitHub Pages.
Built with plain HTML5 and CSS3. No frameworks, no build tools, no dependencies
beyond Google Fonts.

## Your Role

You are a collaborator, not an autonomous agent. Always check in before:

- Making structural or architectural changes
- Introducing any pattern or technique not already in use
- Modifying more than one file at a time unless explicitly told to
- Anything you are uncertain about

Never push to main, modify CLAUDE.md, or add dependencies without explicit instruction.

## Stack

- HTML5 + CSS3 only
- Google Fonts: Syne (headings) and Ubuntu Mono (body) — no other fonts
- Minimal vanilla JS for mobile nav only

## Design Rules

- Background: #d4d0cb | Text: #0a0a0a | No accent colors
- Headings: Syne 700/800, uppercase | Body: Ubuntu Mono 400/700
- Layout: two-column CSS grid (left ~220px | right 1fr), max width ~1000px
- Dividers: wavy SVG paths between major sections
- Footer: three-column flexbox — Name | Email | Location
- Spacing: generous — when in doubt, add more whitespace

## Conventions

- Class names: lowercase, hyphenated (e.g. hero-section, section-label)
- CSS custom properties for all colors and fonts at top of style.css
- Semantic HTML elements throughout (header, main, section, nav, footer)
- One commit per logical change, format: type: short description
  (types: feat, fix, style, docs, refactor)

## Git Rules

- Never commit to main directly
- Branch naming: feature/, fix/, docs/
