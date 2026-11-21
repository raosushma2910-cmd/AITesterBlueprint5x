# Requirement Analysis Prompt

## Context
Analyze the supplied requirements and supporting project context:
- Requirements or source documents: `[PASTE HERE]`
- Relevant context, if any: `[PASTE HERE]`

## Role
Act as a QA engineer analyzing requirements for clarity and testability.

## Instructions
- Extract the stated behaviors, rules, inputs, outputs, and acceptance criteria.
- Identify ambiguity, contradiction, missing detail, and testability concerns.
- Do not assume expected behavior that is not documented.
- Mark uncertain or unanswered points as `[NEEDS CLARIFICATION]`.
- State missing information as “Not specified in requirements.”
- Label any necessary inference as `[ASSUMPTION]`.

## Style
Use concise, neutral language and preserve the meaning of the source requirements.

## Parameters
- Output sections: Requirement summary; Testable requirements; Ambiguities, conflicts, and gaps; Questions; Traceability from supplied requirement references to test focus.
- Include traceability only when requirement references are supplied.
