// Load Stripe.js dynamically
function loadScript(url) {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = url;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}
loadScript("https://js.stripe.com/v3/").then(() => {
  // The rest of your popup.js code
});

window.onload = function () {
  const searchInput = document.getElementById("searchInput");
  const results = document.getElementById("results");

  searchInput.addEventListener("input", function () {
    const query = searchInput.value.trim();

    if (!query) {
      results.innerHTML = "";
      return;
    }

    chrome.bookmarks.search({ query }, function (bookmarks) {
      results.innerHTML = "";

      for (const bookmark of bookmarks) {
        if (!bookmark.url) {
          continue;
        }

        const listItem = document.createElement("li");
        const link = document.createElement("a");
        link.href = bookmark.url;
        link.target = "_blank";

        // アイコンを追加
        const favicon = document.createElement("img");
        favicon.src = `https://www.google.com/s2/favicons?domain=${encodeURIComponent(
          new URL(bookmark.url).hostname
        )}`;
        link.appendChild(favicon);

        const title = document.createTextNode(bookmark.title);
        link.appendChild(title);

        listItem.appendChild(link);
        results.appendChild(listItem);
      }
    });
  });
};

// 広告削除ボタンのクリックイベント
document
  .getElementById("removeAdsButton")
  .addEventListener("click", async function () {
    chrome.runtime.sendMessage({ action: "redirectToCheckout" }, (response) => {
      if (!response.success) {
        console.error("Error redirecting to checkout");
      }
    });
  });

// サーバーからStripe CheckoutセッションIDを取得する関数
async function fetchYourCheckoutSessionId() {
  try {
    const response = await fetch(
      "http://localhost:3000/create-checkout-session",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      }
    );

    const data = await response.json();
    return data.id; // セッションIDを返すように修正
  } catch (error) {
    console.error("Error fetching checkout session ID:", error);
    return null;
  }
}

