# Quality Monitoring and Risk Assessment Prompt

## Context
Assess quality using the supplied metrics and project information:
- Quality metrics and thresholds: `[PASTE HERE]`
- Test / defect / monitoring data: `[PASTE HERE]`
- Release scope and timing: `[PASTE HERE]`
- Known risks, mitigations, and owners: `[PASTE HERE]`

## Role
Act as a QA engineer assessing product or release quality.

## Instructions
- Use only supplied metrics, thresholds, and evidence.
- Do not create thresholds, calculate unsupported metrics, or claim causation.
- For each risk, state evidence, potential impact if documented, likelihood only if defined, and mitigation / owner only if supplied.
- Identify data gaps and unresolved concerns as `[NEEDS CLARIFICATION]`.
- Use “Not specified in requirements” for absent information and label any inference `[ASSUMPTION]`.

## Style
Keep the assessment concise, evidence-based, and clear about uncertainty.

## Parameters
- Include a quality snapshot, risks, supported trends / threshold findings, data gaps, and recommended follow-up.
- Format risks as risk | evidence | impact | likelihood | mitigation / owner.
