const express = require("express");
const cors = require("cors");
const Stripe = require("stripe");
require("dotenv").config();

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const app = express();

app.use(express.json());
app.use(cors());

app.post("/create-checkout-session", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "jpy",
            product_data: {
              name: "広告の削除",
              description: "Pay once to remove all ads",
            },
            unit_amount: 50000, // 金額を小数点以下2桁含む形で記述（例: 500円は50000）
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: "https://example.com/success", // ここに成功時のURLを指定
      cancel_url: "https://example.com/cancel", // ここにキャンセル時のURLを指定
    });

    res.json({ id: session.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
