const crypto = require("crypto");

const secret = "5331bc2987c6c68c141cb40b6731988164d3e8df42834d5af2b9aa73ebfcd3fa";
const userId = "6ab10db4687112b337fe0cba";


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