// background.js
const stripe = Stripe(
  "pk_live_51Mo2VrGZVxg74KhWbPN6Dnc4OstVBhdYy0IELaNjzLQlYvbkJJe6J3eHIlVmd8IMhkkp1IebOtXSM3AX18bVpCHg00p3Ope8ae"
); // あなたのStripe公開キーを使用してください

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  if (request.action === "redirectToCheckout") {
    try {
      const response = await fetch(
        "http://localhost:3000/create-checkout-session",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const session = await response.json();
      await stripe.redirectToCheckout({ sessionId: session.id });
      sendResponse({ success: true });
    } catch (error) {
      console.error("Error:", error);
      sendResponse({ success: false });
    }
  }
});
