# Wingify Playwright Framework

Playwright Test framework for the observed Wingify login page at
`https://app.wingify.com/#/login`.

The PRD also mentions `https://app.vwo.com/login`. In this environment that URL
returned a blank `[]` response and HTTP 401 instead of redirecting, so it is not
configured as the test base URL.

## Structure

- `src/pages/login.page.ts`: login Page Object and reusable actions
- `tests/login.spec.ts`: login controls and password visibility UI tests
- `tests/valid-login.spec.ts`: opt-in valid-login test
- `tests/invalid-login.spec.ts`: opt-in invalid-login test
- `playwright.config.ts`: Chromium/Chrome settings and reporters

## Prerequisites

- Node.js 20 or later
- npm
- Google Chrome

## Install

```powershell
Set-Location "C:\Users\hp\Sushma\AITesterBlueprint5x\Chapter_02_Prompt_engineering\RicePot\PlaywrightFramework"
npm.cmd install
```

The configuration uses the installed Google Chrome and does not require
installing a separate Playwright browser.

## Run the UI tests headed

```powershell
npm.cmd run test:headed
```

Run headless with `npm.cmd test`. The HTML report is written to
`playwright-report`; open it with `npm.cmd run report`.

Authentication tests are skipped unless `RUN_AUTH_TESTS=true` and their
required environment variables are set. Only run them with an authorized test
account, and avoid repeated invalid-login attempts.

### Valid login

Set `VWO_USERNAME`, `VWO_PASSWORD`, and `VWO_POST_LOGIN_INDICATOR` to the
credentials and a visible text marker observed after successful login.

### Invalid login

Set `VWO_INVALID_USERNAME`, `VWO_INVALID_PASSWORD`, and
`VWO_INVALID_LOGIN_ERROR` to an approved test input and the exact visible
error text observed for that input. This test makes one login attempt per run.

Do not commit credentials or other secrets.
