require("dotenv").config();

const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const app = express();
app.use(cors());
app.use(express.json());

app.post("/create-checkout-session", async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "Remove Ads",
          },
          unit_amount: 500, // 5.00 USD
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: "YOUR_EXTENSION_URL/success.html",
    cancel_url: "YOUR_EXTENSION_URL/cancel.html",
  });

  res.json({ id: session.id });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
