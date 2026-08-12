# BrandEx IP Practice - Agent Guidelines

## Automatic Git Backup Rule

**IMPORTANT**: After ANY edit, modification, creation, deletion, or any code changes, you MUST:

1. Stage the changes: `git add .`
2. Commit with descriptive message: `git commit -m "Description of changes"`
3. Push to GitHub: `git push`

This ensures all work is automatically backed up to the GitHub repository (https://github.com/0utLawzz/BrandEx-IP-Practice.git) as a safety measure.

### Commit Message Format

- Be descriptive but concise
- Focus on what was changed and why
- Example: "Add authentication service module" or "Fix login page validation error"

### When to Commit and Push

- After creating new files
- After editing existing files
- After deleting files
- After refactoring code
- After configuration changes
- After adding dependencies
- After any code modifications

### Exception

- Do not commit sensitive data (API keys, secrets, etc.)
- Ensure `.env` files remain git-ignored (already configured in .gitignore)

## Project Context

- **Project**: BrandEx IP Practice
- **Type**: Multi-tenant SaaS for IP Law Practice Management
- **Repository**: https://github.com/0utLawzz/BrandEx-IP-Practice.git
- **Branch**: master
- **Tech Stack**: React + TypeScript + Vite + TanStack Router + TanStack Query + Tailwind CSS + shadcn/ui

## Development Guidelines

- Follow the established modular structure
- Use path aliases (`@/*`) for imports
- Maintain clean separation of concerns
- Add new features in `src/features/` when business logic is implemented
- Use TanStack Router for routing
- Use TanStack Query for server state management
- Follow existing code style and patterns

## Testing

- Run tests before committing: `npm test -- --run`
- Run production build before committing: `npm run build`
- Run linting before committing: `npm run lint`
- Fix any failing tests or build errors before committing
- All tests must pass before pushing changes
