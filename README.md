# SK Hub

An open-source browser toolkit for designers, marketers, and small creative agencies, maintained by StoryKart Advertise.

**[Open the live demo](https://storykartadvertise-hub.github.io/skhub/)** · [Contribute](CONTRIBUTING.md) · [Report a bug](https://github.com/storykartadvertise-hub/skhub/issues)

## Tools

| Tool | What it does |
| --- | --- |
| AI Video Prompt Architect | Combines scene, subject, motion, audio, style, lighting, and aspect ratio into a copyable prompt. Includes a sample. |
| Commercial Image Builder | Combines a product, environment, aesthetic preset, and aspect ratio into a copyable prompt. |
| Meta Ads & ROAS Calculator | Estimates revenue, ROAS, CPA, and click-to-conversion rate from manually entered figures. |

The prompt builders assemble text locally. They do not call an AI service or generate images or video. No API key is required. Image prompts currently use `--ar` syntax; adapt this for your chosen generator. Resolution terms are creative instructions, not guarantees about exported media.

## Run locally

Clone and serve the directory using Python 3:

```sh
git clone https://github.com/storykartadvertise-hub/skhub.git
cd skhub
python3 -m http.server 8000 --bind 127.0.0.1
```

Open `http://localhost:8000`. No build step or package installation is needed. Tailwind CSS and Google Fonts load from external services and need internet access. Clipboard copying requires a supported browser on HTTPS or localhost and clipboard permission; manual copying remains available.

## Try it

1. In the video tab, choose **Load Sample**, edit the fields, and copy the compiled prompt.
2. In the image tab, enter your product and background, then select a preset and ratio.
3. In the calculator, enter spend, average order value, clicks, and sales for the same reporting period and attribution basis.

Use one currency throughout. With spend **15,000**, average order value **1,200**, **1,250** clicks, and **45** sales:

| Metric | Formula | Result |
| --- | --- | --- |
| Estimated revenue | Sales × average order value | 54,000 |
| ROAS | Revenue ÷ spend | 3.60x |
| CPA | Spend ÷ sales | 333.33 |
| Conversion rate | Sales ÷ clicks × 100 | 3.60% |

Zero denominators show **N/A**. Blank, negative, non-finite, or fractional count inputs show a validation message. ROAS measures revenue relative to ad spend, not profit. This tool does not connect to Meta Ads or verify attribution.

## Resources

- [Creative design prompts](prompts/creative-design-prompts.md)
- [Meta Ads framework](prompts/templates/meta-ads-framework.md)

These are starting points to adapt and evaluate for your campaign, without guaranteed marketing results.

## Contributing and checks

Read [CONTRIBUTING.md](CONTRIBUTING.md) for bug reports, code changes, prompt submissions, and manual checks. Run regression checks with Node.js 18 or later:

```sh
node --test tests/tools.test.cjs
```

## License and contact

Released under the [MIT License](LICENSE).

- Portfolio: [@story.kart](https://instagram.com/story.kart)
- Business enquiries: [WhatsApp](https://wa.me/919746579243)
