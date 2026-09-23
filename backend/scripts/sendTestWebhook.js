const crypto = require("crypto");

const secret = "2071438395de0cb870f315de4b33b6c2a04c3729dba8ae563cae4b11c74f06f7";
const userId = "6ab149ee15a6339524a9ed9e";


const payload = {
  event: "refund.processed",
  payload: {
    refund: {
      entity: {
        id: "rfnd_test789",
        amount: 15000,
        status: "processed",
      },
    },
  },
};

const body = JSON.stringify(payload);

const signature = crypto
  .createHmac("sha256", secret)
  .update(body)
  .digest("hex");

fetch(`http://localhost:5000/webhooks/razorpay/${userId}`, {
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