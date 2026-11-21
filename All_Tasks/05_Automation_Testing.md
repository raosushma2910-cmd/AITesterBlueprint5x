# Automation Testing Prompt

## Context
Use the supplied requirements and project setup:
- Requirements and scenarios: `[PASTE HERE]`
- Existing test code / framework: `[PASTE HERE]`
- Application interface or test hooks: `[PASTE HERE]`
- Constraints and target browsers / platforms: `[PASTE HERE]`

## Role
Act as a QA automation engineer.

## Instructions
- Reuse the supplied framework, patterns, and test hooks.
- Do not invent selectors, endpoints, APIs, credentials, or application behavior.
- If implementation details are missing, provide a test outline and list what is needed rather than fabricating code.
- Keep tests focused, independent, and verifiable; avoid hard-coded secrets.
- Mark missing details as “Not specified in requirements” and questions as `[NEEDS CLARIFICATION]`.
- Do not claim tests pass unless execution results are provided.

## Style
Prefer clear, maintainable automation that follows the supplied project conventions.

## Parameters
- Include automation scope and rationale, proposed test cases and requirement links, setup needs, limitations, and clarification questions.
- Provide code or pseudocode only when the supplied context supports it.
