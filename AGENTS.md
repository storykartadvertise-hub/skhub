# StoryKart Advertise — Repository Instructions

## Code Review Rules

### General review standards
- Report actionable issues introduced by the pull request, not unrelated pre-existing issues.
- Prioritize correctness, security, broken user flows, data loss, and material regressions.
- Include severity, affected file and line, user impact, and a practical fix.
- Do not present speculative concerns as confirmed bugs or claim tests passed unless they ran.
- Keep review comments focused; leave formatting and routine style checks to automated tooling.

### Prompt builder behavior
- Preserve all five video-prompt components: scene, element, movement, audio, and style/output settings (visual style, aspect ratio, and lighting/resolution).
- Preserve image-prompt composition: subject, background, aesthetic preset, and aspect ratio.
- When changing HTML control IDs, labels, or event handlers, verify the matching JavaScript selectors and generated output remain consistent.
- Keep generated prompt text readable and ensure user-entered values are not silently dropped when controls change.

### Meta Ads & ROAS calculator
- Preserve the formulas: revenue = conversions × average order value; ROAS = revenue ÷ ad spend; CPA = ad spend ÷ conversions; conversion rate = conversions ÷ link clicks × 100.
- Handle zero denominators and invalid or negative inputs without displaying misleading metrics or NaN/Infinity.
- Label metrics clearly; ROAS is a revenue-to-ad-spend ratio, not profit.
- Add or update tests when calculation logic changes, including zero spend, zero clicks, and zero conversions.

### UI, accessibility, and browser APIs
- Tab navigation must show the selected section and keep the visual active state in sync with the selected tab.
- Preserve responsive layouts and accessible labels when changing controls or navigation.
- Clipboard actions must provide accurate success/failure feedback and handle unsupported or rejected clipboard access.
- Treat user-entered values as text; do not inject untrusted input as HTML.

### Security and dependencies
- Never add API keys, passwords, access tokens, or private client data to the repository.
- Avoid weakening security controls or adding external scripts/dependencies without a clear need.
- Do not run destructive commands, deploy, publish, or change production data without explicit authorization.

### Review output
- Order findings by severity and state the impact and recommended correction.
- Mention relevant test coverage or verification gaps.
- If no actionable issues are found in the change, say so clearly.
