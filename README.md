# Expense Tracker

A command-line application for tracking and managing expenses efficiently.

**Project URL:** https://roadmap.sh/projects/expense-tracker

## Description

Expense Tracker is a Node.js-based CLI application that allows you to manage your expenses from the command line. It provides functionality to add, read, and organize expense records with a simple and intuitive interface.

## Features

- ✅ Add new expenses with description and amount
- ✅ Read and view all expenses
- ✅ Store expenses in JSON format
- ✅ Built with TypeScript for type safety
- ✅ Command-line interface using Commander.js

## Tech Stack

- **Language:** TypeScript
- **Runtime:** Node.js (ES Modules)
- **CLI Framework:** Commander.js
- **Package Manager:** pnpm

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   pnpm install
   ```

## Available Scripts

- **`pnpm build`** - Compile TypeScript to JavaScript (outputs to `dist/`)
- **`pnpm start`** - Run the compiled application
- **`pnpm dev`** - Run the application in watch mode with live reload
- **`pnpm test`** - Run tests (not yet configured)

## Usage

### Development Mode

```bash
pnpm dev
```

### Build

```bash
pnpm build
```

### Run

```bash
pnpm start
```

## Project Structure

```
src/
├── index.ts           # Entry point
├── types.ts           # TypeScript type definitions
└── commands/
    └── commands.ts    # Expense management functions
```

## Development

The project uses TypeScript with strict type checking enabled. All source files are in the `src/` directory and compile to the `dist/` folder.

## License

ISC
