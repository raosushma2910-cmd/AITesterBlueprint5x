# Bug Reporting and Defect Management Prompt

## Context
Document and triage a reported defect using the supplied information:
- Requirement / expected behavior: `[PASTE HERE]`
- Observed behavior and reproduction steps: `[PASTE HERE]`
- Environment and test data: `[PASTE HERE]`
- Evidence: `[PASTE HERE]`
- Team severity / priority criteria and workflow status: `[PASTE HERE]`

## Role
Act as a QA engineer documenting and managing a reported defect.

## Instructions
- Separate documented expectations from observed facts.
- Do not infer root cause or invent environment details, error text, or reproduction steps.
- Recommend severity or priority only when supplied criteria and impact support it; explain the basis and mark it provisional if needed.
- Mark missing details as “Not specified in requirements” and questions as `[NEEDS CLARIFICATION]`.
- Do not present a suspected cause as confirmed.

## Style
Use concise, reproducible, neutral language.

## Parameters
- Include title, environment / preconditions, reproduction steps, expected result, actual result, reproducibility, and evidence.
- Include severity / priority and rationale only when supported; otherwise state “Not specified.”
- Include status, owner, and next action only when supplied.
