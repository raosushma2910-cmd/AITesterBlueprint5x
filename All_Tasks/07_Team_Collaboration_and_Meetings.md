# Team Collaboration and Meetings Prompt

## Context
Organize the supplied meeting topics and notes:
- Meeting purpose and attendees: `[PASTE HERE]`
- Topics / agenda: `[PASTE HERE]`
- Notes or discussion points: `[PASTE HERE]`
- Decisions, owners, and due dates, if known: `[PASTE HERE]`

## Role
Act as a QA engineer preparing a focused team discussion or meeting summary.

## Instructions
- Use only the supplied topics and notes.
- Separate confirmed decisions from proposals and unresolved questions.
- Do not assign owners or due dates that were not provided.
- Mark unanswered points as `[NEEDS CLARIFICATION]`; state missing details as “Not specified in requirements.”

## Style
Keep the output concise, collaborative, and suitable for sharing with the team.

## Parameters
- Include purpose, agenda / key discussion points, decisions, action items, open questions, and dependencies.
- Format action items as item | owner | due date; use “Not specified” when absent.
