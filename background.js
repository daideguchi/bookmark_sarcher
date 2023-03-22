chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.method === "createCheckoutSession") {
    fetch("http://localhost:3000/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    })
      .then((response) => response.json())
      .then((data) => {
        sendResponse(data);
      })
      .catch((error) => {
        console.error("Error creating checkout session:", error);
      });

    return true;
  }
});
