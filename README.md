# 🚫 AI Blocker

Are you annoyed by Google Search AI summaries? AI Blocker is a zero-config blocker that reliably eradicates this nasty spam from your search results.
This blocker was created with the help of AI, much appreciated! Works in 100+ countries.

<img height="300" src="https://github.com/user-attachments/assets/d2e8edb6-9b45-4593-999e-445295c4e9c6" alt="AI Blocker Screen" />

## 🔥 Installation

- Chromium: _(pending approval)_
- Firefox: https://addons.mozilla.org/en-US/firefox/addon/no-more-google-ai-overviews/
- Unpacked: https://github.com/lofcz/aiblocker/releases  
(enable developer mode in `chrome://extensions` → unzip `chrome.zip` → `Load Unpacked` → select the unzipped folder)

Unpacked extensions are rendered like this:

<img height="200" src="https://github.com/user-attachments/assets/d38215f1-417f-484f-b584-f0b304c6b446" alt="Unpacked Screen" />


⭐ _Please consider starring this repository if you find it helpful - this increases visibility of the project, and more people can search AI-spam free._

## ⚡ Getting Started

Clone the repository, install dependencies:
```bash
npm i
```

To build `zip` files ready for Chrome & Firefox Extension Stores, run:
```bash
npm run ship
```

This creates a `dist` folder with `chrome.zip` and `firefox.zip`.

## ⚙️ Contributing

If AI summaries are not blocked in your country, please add the title of the summary box into [this file](https://github.com/lofcz/aiblocker/blob/master/src/common/patterns.js). There are certain countries my VPN doesn't support, so filling in the missing spots would be appreciated. Thank you!

## License

This library is licensed under the [MIT](https://github.com/lofcz/aiblocker/blob/master/LICENSE) license. 💜
