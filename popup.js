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

async function makePayment(amount) {
  try {
    const response = await fetch("http://localhost:3000/payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount }),
    });

    const data = await response.json();
    // data.clientSecretを使ってクライアント側で支払い処理を行う
  } catch (error) {
    console.error("Error making payment:", error);
  }
}

  // Stripeの公開可能キーを設定
const stripePublicKey =
  "pk_live_51Mo2VrGZVxg74KhWbPN6Dnc4OstVBhdYy0IELaNjzLQlYvbkJJe6J3eHIlVmd8IMhkkp1IebOtXSM3AX18bVpCHg00p3Ope8ae";

// Stripeのインスタンスを作成
const stripe = Stripe(stripePublicKey);

// 広告削除ボタンのクリックイベント
document.getElementById("removeAdsButton").addEventListener("click", async function () {
  // Stripe CheckoutセッションIDをサーバーから取得
  const sessionId = await fetchYourCheckoutSessionId();
  
  if (sessionId) {
    // Stripe Checkout画面にリダイレクト
    stripe.redirectToCheckout({ sessionId: sessionId });
  } else {
    alert("決済処理に失敗しました。もう一度やり直してください。");
  }
});

// サーバーからStripe CheckoutセッションIDを取得する関数
async function fetchYourCheckoutSessionId() {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage({ method: "createCheckoutSession" }, (response) => {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError);
        reject(chrome.runtime.lastError);
      } else {
        resolve(response.sessionId);
      }
    });
  });
}

