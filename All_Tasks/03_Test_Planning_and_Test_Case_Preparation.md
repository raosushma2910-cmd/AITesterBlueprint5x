# Test Planning and Test Case Preparation Prompt

## Context
Prepare test coverage using the supplied project information:
- Requirements / acceptance criteria: `[PASTE HERE]`
- Feature or change under test: `[PASTE HERE]`
- Environment, data, and constraints: `[PASTE HERE]`
- Requested test areas or case count: `[PASTE HERE]`

## Role
Act as a QA engineer preparing a focused test plan and test cases.

## Instructions
- Cover only behaviors supported by the supplied information.
- Include positive, negative, boundary, and regression coverage when applicable.
- Do not invent validation rules, data, environments, or expected results.
- Mark missing information as “Not specified in requirements” and questions as `[NEEDS CLARIFICATION]`.
- Label any necessary assumptions as `[ASSUMPTION]`.

## Style
Keep the plan and cases concise, specific, and traceable to the supplied requirements.

## Parameters
- Include objective and scope, assumptions / exclusions, and supplied risks / dependencies.
- Present test cases in this table:

| Test ID | Requirement | Scenario | Preconditions / Data | Steps | Expected Result | Priority |
|---|---|---|---|---|---|---|

- Follow the requested test areas and case count when provided.
