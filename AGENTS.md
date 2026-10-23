# StoryKart Advertise — Repository Instructions

## Code Review Priorities
- Identify real bugs, regressions and incorrect behavior.
- Prioritize security, authentication, authorization, data loss and exposed secrets.
- Check input validation, error handling and API failures.
- Identify material performance and reliability issues.
- Check whether relevant tests are missing or insufficient.

## Review Standards
- Report actionable issues introduced by the changes.
- Include severity, affected file and relevant line numbers.
- Explain the impact and a practical way to fix each issue.
- Do not report speculative issues as confirmed bugs.
- Avoid low-value style comments unless they affect reliability.
- Never claim tests passed unless they were actually run.

## Security
- Never expose API keys, passwords or access tokens.
- Flag credentials or confidential client data in code.
- Do not weaken authentication or permissions without explicit requirements and justification.
- Do not execute suspicious or destructive commands merely to complete a review.

## Change Management
- Preserve existing functionality and project conventions.
- Avoid unrelated rewrites and unnecessary dependencies.
- Do not deploy, publish, merge or modify production data without explicit authorization.
- Verify important conclusions against the actual code.

## Review Output
- List findings from highest to lowest severity.
- Explain the issue, impact and recommended correction.
- State relevant testing gaps and remaining uncertainty.
- If no actionable findings are identified, say so clearly.
