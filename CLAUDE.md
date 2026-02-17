# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

React 19 + Vite form application with React Router for SPA routing. Uses the React Compiler for optimization.

## Commands

```bash
# Development server with hot reload
npm run dev

# Production build
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## Architecture

- **Entry point**: `src/main.jsx` - Sets up React Router with BrowserRouter
- **Main component**: `src/App.jsx` - Application shell
- **Build tool**: Vite with @vitejs/plugin-react (Babel-based)
- **React Compiler**: Enabled via babel-plugin-react-compiler

## Key Technical Details

- React 19.2.0 with React Router 7.13.0
- ES Module project (type: "module")
- ESLint 9.x flat config format (eslint.config.js)
- No test framework currently configured
- Compatible with both npm and Bun (bun.lock present)
