# Contributing to SK Hub

Help improve practical tools and resources for designers, marketers, and small agencies. Contributions can include bug fixes, usability improvements, prompt examples, or marketing templates.

## Report a problem or suggest a change

Use [GitHub Issues](https://github.com/storykartadvertise-hub/skhub/issues). Include the tool, your task, steps and sample inputs, expected and actual results, and browser/device details. Screenshots help when relevant.

Use fictional examples. Do not include private client data, account credentials, API keys, or campaign figures. For larger features, explain the user problem in an issue before starting implementation.

## Make a contribution

1. Fork the repository and create a branch for your change.
2. Follow the local setup in [README.md](README.md).
3. Keep the change focused and use readable HTML, CSS, JavaScript, or Markdown.
4. Run the checks below and update documentation when behavior changes.
5. Open a pull request explaining the problem, your change, and how you checked it. Include screenshots for visible changes.

For prompts and templates, explain the intended audience and use case. Include sample inputs and outputs where possible, and distinguish tested observations from assumptions. Submit only material you have the right to share under the project's MIT License.

## Validation

Run `node --test tests/tools.test.cjs` using Node.js 18 or later. These checks cover calculator edge cases and clipboard outcomes using a minimal DOM substitute; they do not replace browser checks.

Before proposing UI changes, serve the page locally and check:

- All three tabs work on desktop and a narrow mobile viewport.
- Prompt output updates when inputs and selections change.
- Copy reports success only after a successful clipboard write; denied permission gives manual-copy guidance.
- Default calculator inputs produce revenue 54,000, ROAS 3.60x, CPA 333.33, and CVR 3.60%.
- Zero denominators show N/A; negative, blank, or fractional count inputs show an error. Valid inputs clear the error.

## Releases

Maintainers should publish a release only after checking the intended version. Release notes should list actual changes, fixes, and known limitations. User feedback and real issue resolution are welcome; no contribution count or adoption claim is required to contribute.
