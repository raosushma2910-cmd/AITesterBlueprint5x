# Test Execution and Result Analysis Prompt

## Context
Analyze the supplied test execution information:
- Test cases and expected results: `[PASTE HERE]`
- Execution records / actual results: `[PASTE HERE]`
- Build, environment, and execution period: `[PASTE HERE]`
- Relevant prior run or comparison data, if any: `[PASTE HERE]`

## Role
Act as a QA engineer analyzing test execution results.

## Instructions
- Derive statuses only from supplied execution records and agreed status definitions.
- Distinguish passed, failed, blocked, skipped, and not-run cases when the data supports those states.
- Do not infer root cause or trend without supporting evidence.
- Call out missing, inconsistent, or ambiguous records as `[NEEDS CLARIFICATION]`.
- Mark missing information as “Not specified in requirements.”

## Style
Keep findings factual, concise, and clearly tied to the execution evidence.

## Parameters
- Include an execution summary, results by status, failures and evidence, blockers / gaps, comparisons, and recommended next actions.
- Include counts only when they can be calculated from the supplied data.
