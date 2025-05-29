# E2E Tests with Playwright

## Setup

1. Install dependencies:
   ```bash
   npm install --save-dev @playwright/test
   npx playwright install
   ```
2. Start your frontend using Docker Compose:
   ```bash
   docker-compose up frontend-customer
   ```
   By default, the frontend-customer will be available at http://localhost:5173

## Running tests

```bash
npx playwright test
```

## Notes
- Update `baseURL` in `playwright.config.ts` if your frontend runs on a different port or URL.
- Example test: `example.spec.ts`.
