const crypto = require("crypto");

const secret = "your_temporary_test_secret_123";

const payload = {
  event: "payment.captured",
  payload: {
    payment: {
      entity: {
        id: "pay_test123",
        amount: 50000,
        status: "captured",
      },
    },
  },
};

const body = JSON.stringify(payload);

const signature = crypto
  .createHmac("sha256", secret)
  .update(body)
  .digest("hex");

fetch("http://localhost:5000/webhooks/razorpay", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "x-razorpay-signature": signature,
  },
  body: body,
})
  .then((res) => res.text())
  .then((data) => console.log("Response:", data))
  .catch((err) => console.error("Error:", err));