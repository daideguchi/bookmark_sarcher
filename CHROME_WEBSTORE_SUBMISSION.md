# Chrome Web Store Submission Notes

Use these values when submitting version `1.1.0` for review.

## Submission status

- Submitted for Chrome Web Store review on 2026-06-01 JST.
- Dashboard status after submission: `審査待ち`.
- Item ID: `ahnagedeobidhdhmfbnhopgjiddkfdel`.
- Uploaded package: `dist/book-makuri-search-1.1.0.zip`.
- Package SHA-256: `d1fa9721298283db93abc4a301fa2ec3b5cd8fe6128ec2746b0299a00c855927`.

## Single purpose

Book Makuri Search helps users search bookmarks saved in their Chrome browser from a compact popup.

## Permission justification

`bookmarks`: Required to search the user's saved Chrome bookmarks after the user types a keyword in the popup. Bookmark data is used only inside the browser and is not sent to any server.

## Remote code

No remote code is used. All JavaScript is packaged in the extension.

## Data usage

The extension does not collect, store, sell, or transfer user data. Bookmark titles and URLs are accessed only locally to show search results.

## Privacy policy URL

https://daideguchi.github.io/bookmark_sarcher/privacy.html

## Review-risk changes made in 1.1.0

- Removed Stripe and ad-related code.
- Removed the unused `payment` permission and deprecated payment metadata.
- Removed localhost network calls.
- Removed third-party favicon requests so bookmark domains are not sent outside the browser.
- Removed the unused server directory and bundled `node_modules`.
