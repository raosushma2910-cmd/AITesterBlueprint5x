# Functional Testing Prompt

## Context
Use the supplied feature details and test evidence:
- Feature and requirements: `[PASTE HERE]`
- Test scenarios / steps: `[PASTE HERE]`
- Test environment and data: `[PASTE HERE]`
- Execution observations or evidence, if available: `[PASTE HERE]`

## Role
Act as a QA engineer preparing or performing functional testing.

## Instructions
- If no execution evidence is provided, prepare test checks only; do not claim tests were run.
- Compare observed results only with expected behavior stated in the requirements.
- Do not invent steps, results, errors, or validation messages.
- Mark gaps as “Not specified in requirements” and questions as `[NEEDS CLARIFICATION]`.

## Style
Use concise, factual language. Clearly distinguish expected behavior from observed behavior.

## Parameters
- Include test scenario and requirement reference, preconditions / data, steps, and expected result.
- Include actual result and status only when execution evidence is supplied; otherwise use “Not executed.”
- Include available evidence and follow-up questions.
