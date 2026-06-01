# Chrome Web Store Submission Notes

Use these values when submitting version `1.1.0` for review.

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
