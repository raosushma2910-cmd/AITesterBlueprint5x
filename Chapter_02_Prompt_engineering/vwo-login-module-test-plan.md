# VWO Login Module — Functional Test Plan

| Document field | Value |
|---|---|
| Test Plan ID | VWO-LOGIN-TP-001 |
| Title | VWO Login Module Functional Test Plan |
| Status | Draft for review |
| Application | VWO login page — <https://app.vwo.com/> |
| Basis | Approved requirements supplied for this exercise |

## 1. Objective

Verify that registered users can authenticate with valid credentials, that invalid or incomplete credentials do not grant access, and that successful authentication opens the authenticated dashboard.

## 2. Scope

### In scope

- Login using valid registered-user credentials.
- Login attempts using invalid credentials.
- Required email and password fields, individually and together.
- The specified invalid-login error message.
- Access to the authenticated dashboard after successful login.
- Confirmation that unsuccessful login attempts do not open the authenticated dashboard.

### Out of scope

- Registration, password reset, account lockout, multifactor authentication, and logout.
- Authorization or functionality within the dashboard beyond confirming it opens.
- Security, performance, accessibility, and broad browser-compatibility testing.
- Password composition, email-format rules, case sensitivity, and session behavior not specified in the supplied requirements.

## 3. Test Approach

Use black-box functional testing in an approved non-production environment. Execute the scenarios below using controlled test accounts. For each attempt, record the inputs category (never the actual password), observed result, evidence, and pass/fail status.

Run positive scenarios before negative scenarios to establish that the test environment and valid account work. For failed login attempts, verify that authentication is denied and the authenticated dashboard is not made available. Compare the invalid-credentials message exactly with the supplied text when that requirement applies.

No particular browser/device matrix, automation tool, or test schedule was provided; confirm these before execution.

## 4. Test Scenarios

| ID | Type | Scenario and test data | Expected result |
|---|---|---|---|
| LOG-001 | Positive | Submit valid credentials for an active registered test user. | Login succeeds and the authenticated dashboard opens. |
| LOG-002 | Positive | After LOG-001 succeeds, verify the resulting page is the authenticated dashboard rather than the login page. | Dashboard is accessible following successful login. Specific dashboard content is outside this plan. |
| LOG-003 | Negative | Submit an incorrect password for a registered test email. | Access is denied and the error message is exactly: **“Your email, password, IP address or location did not match”**. The authenticated dashboard does not open. |
| LOG-004 | Negative | Submit an unregistered email with a password. | Access is denied, the error message is exactly: **“Your email, password, IP address or location did not match”**, and the authenticated dashboard does not open. |
| LOG-005 | Negative / required-field boundary | Leave email empty and provide a password; submit. | Login is not successful and the authenticated dashboard does not open. The email field is mandatory. Exact validation wording and whether submission is blocked client-side are **Requires clarification**. |
| LOG-006 | Negative / required-field boundary | Provide an email and leave password empty; submit. | Login is not successful and the authenticated dashboard does not open. The password field is mandatory. Exact validation wording and whether submission is blocked client-side are **Requires clarification**. |
| LOG-007 | Negative / required-field boundary | Leave both email and password empty; submit. | Login is not successful and the authenticated dashboard does not open. Both fields are mandatory. Exact validation wording and presentation are **Requires clarification**. |
| LOG-008 | Boundary / clarification | Enter whitespace-only email or password, one field at a time, and submit. | Expected handling is **Requires clarification**. Confirm whether whitespace-only values count as empty before execution; do not treat trimming or acceptance/rejection behavior as an approved requirement. |

## 5. Environment and Test Data

### Environment needs

- An approved, reachable test instance of the VWO login page; avoid production accounts unless explicitly authorized.
- Browser and operating-system versions selected by the project. The supported matrix is **Requires clarification**.
- Network access to the application and its authentication service.
- A way to observe the authenticated dashboard and capture test evidence without exposing credentials.

### Test data

- One active registered test account with valid credentials.
- An incorrect password for that registered email.
- An unregistered test email and a non-sensitive password value.
- Empty values for required-field scenarios.
- Whitespace-only values for the clarification scenario.

The project must provision and securely share the actual account data. Do not place real passwords in this document, test evidence, or defect reports.

## 6. Entry and Exit Criteria

All criteria in this section are **proposed recommendations** and require project approval.

### Entry criteria

- Requirements and the exact invalid-login message have been reviewed and approved.
- The test environment is available and the login module is ready for testing.
- Valid test-account credentials and negative test data are provisioned.
- The target browser/device matrix and evidence-handling process are agreed.
- Open questions that block expected-result decisions are resolved or explicitly accepted for testing.

### Exit criteria

- All in-scope scenarios have been executed and their results recorded.
- Positive login and dashboard-access scenarios pass.
- Invalid and incomplete credential scenarios do not grant dashboard access.
- Any failures are documented with reproducible steps and sensitive values omitted.
- No unresolved critical or high-severity defects remain, or the accountable owner has accepted them.
- A test summary and outstanding risks/questions are delivered.

## 7. Deliverables

- This functional test plan.
- Scenario execution results and supporting evidence.
- Defect reports for observed failures.
- A test summary listing coverage, pass/fail/blocked counts, and open risks.

## 8. Risks and Open Questions

### Risks

- Unavailable or unstable test environment may block execution.
- Missing valid test-account access prevents confirmation of the success path.
- Unspecified browser support may leave coverage expectations unclear.
- Exposing credentials in evidence or defect reports could compromise test accounts; redact them.
- Unspecified validation behavior may lead to inconsistent judgments for empty and whitespace-only inputs.

### Open questions

1. What test environment and browser/device matrix should be used?
2. Should invalid email and incorrect password both display the exact supplied error message? The plan applies the supplied message to both invalid-credential scenarios.
3. What validation behavior and user-facing messages are expected when either or both required fields are empty?
4. Should whitespace-only values be treated as empty, and should leading/trailing whitespace be trimmed?
5. Are there additional account states (for example, disabled or locked) that are in scope?
6. What dashboard element or URL is the agreed confirmation that login succeeded?
7. Are there any requirements for session duration or behavior after the dashboard opens? These are out of scope until clarified.

