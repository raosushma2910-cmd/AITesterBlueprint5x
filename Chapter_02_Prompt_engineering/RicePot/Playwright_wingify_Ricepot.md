### R — Role
Act as a QA automation engineer experienced in Playwright and maintainable end-to-end test frameworks.

### I — Instructions
1. Target https://app.wingify.com/#/login.
2. First inspect the login page and report the visible controls, labels, and relevant behavior. Do not create or edit files yet; wait for my confirmation.
3. Do not assume selectors, validation messages, successful-login behavior, or other UI details. Base locators and assertions on the page you actually inspect.
4. After I confirm, build a runnable Playwright framework using TypeScript and the Playwright Test runner.
5. Use a Page Object Model, reusable fixtures, explicit waits, and clear test setup/teardown. Prefer accessible role/label locators; use other locators only when inspection shows they are needed.
6. Include valid- and invalid-login tests only for behaviors supported by the observed UI. Read test credentials from environment variables; never hard-code credentials. Skip the valid-login test if credentials are not configured.
7. Run the tests in headed mode and report the results. Do not claim a test passed if it could not be run or its assertion could not be verified.

### C — Context
I want a Playwright login-testing framework for the Wingify app at https://app.wingify.com/#/login.
Keep it separate from the existing Selenium framework, in a sibling folder named PlaywrightFramework.

### E — Example
Use page-object methods to represent user actions, and write tests that assert outcomes observed on the actual page rather than guessed messages or URLs.

### P — Parameters
- Keep the implementation focused on the login page.
- Do not use Thread.sleep or fixed-delay waits.
- Do not invent UI features, selectors, messages, or behavior.
- Keep secrets out of source control.
- Preserve clear setup instructions and report test outcomes honestly.

### O — Output
After I confirm the inspection:
- A runnable Playwright project with its dependency manifest and configuration.
- Page Object and test files.
- Environment-variable instructions for credentials.
- Commands to run tests headed and view the reports.
- A concise summary of files changed and test results.

### T — Tone
Clear, technical, and suitable for someone learning how to build a test framework.