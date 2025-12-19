---
description: Semantic versioning rules for react-bali-calendar package
---

# Versioning Rules for react-bali-calendar

Follow Semantic Versioning (SemVer): `MAJOR.MINOR.PATCH`

## PATCH (x.x.+1)
Increment PATCH for:
- Bug fixes (date calculation errors, display glitches)
- Typo fixes in text/labels
- Performance improvements with no API changes
- Documentation updates

## MINOR (x.+1.0)
Increment MINOR for:
- New optional props added
- New visual features/indicators (circles, badges, icons)
- New utility functions exported
- Styling/layout enhancements
- New holiday types supported
- New locales added

## MAJOR (+1.0.0)
Increment MAJOR for:
- Removing or renaming existing props
- Changing prop default values that significantly alter behavior
- Restructuring exports (e.g., changing import paths)
- Dropping support for React versions
- Any change that breaks existing consumer code

## Workflow
1. Determine change type using rules above
2. Update version in `package.json`
3. Add entry to `CHANGELOG.md` with date and changes
4. Run `npm run build`
5. Commit with message: `chore: release vX.Y.Z`

## Current Version
Check `package.json` for current version before incrementing.
