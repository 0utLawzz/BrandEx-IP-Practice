# Contributing to BrandEx IP Practice

## Setup

```bash
git clone https://github.com/0utLawzz/BrandEx-IP-Practice.git
cd BrandEx-IP-Practice
npm install
cp .env.example .env   # optional
npm run dev
```

## Guidelines

- Keep domain rules in `src/lib/businessLogic.ts` and cover them with tests.
- Run `npm test -- --run`, `npm run lint`, and `npm run build` before opening a PR.
- Prefer focused PRs with a clear description.

## Security

See [SECURITY.md](SECURITY.md).
