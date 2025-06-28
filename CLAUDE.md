# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js application for calculating gacha probability in mobile games. The app allows users to input various parameters (stones, pull rates, desired amounts) and calculates the probability of obtaining the desired items, with support for pity systems.

## Development Commands

```bash
# Development
npm run dev                 # Start development server (http://localhost:3000)

# Building
npm run build              # Build for production
npm run start              # Start production server

# Testing
npm test                   # Run all tests
npm run test:watch         # Run tests in watch mode
npm run test:ui            # Run tests with Vitest UI

# Code Quality
npm run lint               # Run ESLint
```

## Architecture

### Core Domain Logic
- `src/domains/GashaCalculation.ts` - Pure functions for probability calculations using binomial distribution
- Uses branded types for type safety (Stone, Rate, Count, Percentage)
- Result type pattern for error handling

### State Management (Jotai)
- `src/stores/atoms.ts` - Centralized state with Jotai atoms
- Input validation is integrated into atom derivations
- Separate atoms for different calculation modes (stone-based vs pull-based)

### Component Structure
- `src/components/` - Reusable UI components with Material-UI
- `src/components/page/` - Page-level components
- All components use TypeScript with strict typing

### Types & Validation
- `src/types/` - Branded types and domain models
- `src/utils/validation.ts` - Input validation with Result type pattern
- Heavy use of functional programming patterns

## Key Patterns

### Branded Types
```typescript
type Stone = Branded<number, "Stone">;
type Rate = Branded<number, "Rate">;
```

### Result Type Pattern
```typescript
type Result<T, E = string> = 
  | { ok: true; value: T }
  | { ok: false; error: E };
```

### Atom Composition
State is managed through composed atoms that derive validation and calculation results from input atoms.

## Testing

- Uses Vitest with React Testing Library
- Test files located alongside source files in `__tests__/` directories
- Focus on testing pure domain functions and validation logic
- Run specific tests: `npm test -- src/domains/__tests__/GashaCalculation.test.ts`

## Important Considerations

- The app handles two calculation modes: stone-based (calculate pulls from available stones) and pull-based (direct pull count input)
- Pity system calculations are optional and add guaranteed hits to probability calculations
- All mathematical operations use pure functions for testability
- Input validation happens at the atom level and propagates through the component tree