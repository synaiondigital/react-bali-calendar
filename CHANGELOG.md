# Changelog

All notable changes to `react-bali-calendar` will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.2.2] - 2025-12-19

### Fixed
- **Consistent calendar size across all months** - Fixed minimum width (320px) and cell dimensions (44x44px)
- Calendar no longer resizes based on holiday content
- Simplified cell layout: centered date number with dot indicators for holidays/moon phases
- All holiday details available in tooltip on hover

## [1.2.1] - 2025-12-19

### Fixed
- **Consistent calendar height** - Calendar popup now has fixed cell height (44px) regardless of holiday content
- Holiday text is now single-line with truncation to prevent layout shifts
- Added small indicator dots for moon phases and national holidays

## [1.2.0] - 2025-12-19

### Added
- **Red circle indicator for Bali holidays** - Dates with Galungan, Kuningan, Nyepi, Saraswati, Pagerwesi, or Tumpek now display a thin red circle around the date number
- Bali holiday names shown in tooltip when hovering circled dates

### Changed
- Day tiles now only show national holidays and cuti bersama as text badges
- Bali holidays (Hari Raya) indicated visually with red circle instead of text

## [1.1.0] - 2025-12-19

### Added
- **Hybrid theming** with new `inheritTheme` prop
  - `inheritTheme={false}` (default): Self-contained theming using CSS variables, no conflicts with consumer's Tailwind config
  - `inheritTheme={true}`: Inherits from consumer's Tailwind dark mode
- Turbopack compatibility improvements
  - Added `default` export condition in package.json
  - Changed `moduleResolution` to `bundler`
  - Separate CSS export (`./styles.css`)
  - Added `"use client"` directives to React components

### Changed
- **Compact calendar layout**
  - Reduced tile height from 90px to 52px
  - Moved Balinese calendar info (Pancawara, Triwara, Saptawara, Wuku, Saka date) to hover tooltip
  - Day tiles now only show holidays (max 2, with overflow indicator)
- CSS is now exported separately instead of being injected into JS

### Fixed
- Dark mode conflicts when used in projects with Tailwind dark mode enabled

## [1.0.0] - 2025-12-18

### Added
- Initial release
- `BaliCalendar` component with Balinese and Indonesian national holidays
- `useBaliCalendar` hook for headless usage
- Utility functions for holiday calculations
- Support for Galungan, Kuningan, Nyepi, Saraswati, Pagerwesi, Tumpek holidays
- Indonesian national holidays and cuti bersama
- Light and dark theme support
- Indonesian and English locale support
