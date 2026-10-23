# SK Hub - Creative Advertising & Digital Marketing Workspace

Welcome to **SK Hub**, a centralized open-source repository designed for creative advertising, high-converting digital marketing workflows, and social media campaign assets. 

This project is built to empower freelance graphic designers, performance marketers, and small agencies by providing them with battle-tested frameworks and creative assets.

## 🚀 Features & Assets
- **Meta Ads Frameworks:** Structural templates for A/B testing, budget optimization, and audience targeting.
- **AI Prompt Engineering:** Highly structured prompt architectures for generating commercial-grade visual concepts and video elements.
- **Copywriting Structures:** Conversion-oriented copy frameworks tailored for distinct consumer segments.

## 🤝 Open Source Contribution
We welcome contributions from the creative community. Whether it's a new prompt structure, a design layout, or a marketing workflow, feel free to submit a pull request!

## 📞 Connect with Us
This repository is maintained and led by professional digital marketing experts.
- **Reference Work & Portfolio:** Check out our work on Instagram [@story.kart](https://instagram.com/story.kart)
- **Business Queries:** Reach out via WhatsApp at **+91 9746579243**

## Run locally

SK Hub is currently a static HTML application. The main entry point is `index.html`; there is no Node.js build step or `npm install` requirement in the current repository.

### 1. Clone the repository

```bash
git clone https://github.com/storykartadvertise-hub/skhub.git
cd skhub
```

If the repository is already cloned, open the existing `skhub` folder instead of cloning it again.

### 2. Start a local web server

With Python 3 installed, run this command from the repository root:

```bash
python -m http.server 8000
```

Then open [http://localhost:8000](http://localhost:8000) in your browser. Stop the server with `Ctrl+C`.

Alternatively, open the folder in VS Code and use a trusted local development server extension.

### 3. Notes

- The current page loads Tailwind CSS and Google Fonts from external CDNs, so an internet connection is needed for those assets.
- Test the video prompt builder, image prompt builder, tab navigation, clipboard buttons, and ROAS calculator after changing the page.
- For the ROAS calculator, verify zero ad spend, zero conversions, and zero clicks; metrics should not be interpreted as profit.
- Do not put API keys, passwords, tokens, or private client data in this public repository.

## Suggested development workflow

1. Create a feature branch from the updated `main` branch.
2. Keep changes focused and test the affected flows locally.
3. Open a pull request describing the change, validation performed, and any known limitations.
4. Review the diff and checks before merging into `main`.
5. Confirm the published GitHub Pages site after changes are merged.
