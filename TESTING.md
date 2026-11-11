# Browser testing

This project uses Playwright Test with a locally installed Chromium browser.

## Run automated tests

```powershell
npm install
npx playwright install chromium
npm test
```

To watch the tests run in a visible browser window:

```powershell
npm run test:headed
```

To open the HTML test report after a run:

```powershell
npm run test:report
```

The Playwright configuration starts a local Python HTTP server at `http://127.0.0.1:4173`. No hosted service or paid account is required. Test output and screenshots are written to ignored `test-results/` and `playwright-report/` folders.
