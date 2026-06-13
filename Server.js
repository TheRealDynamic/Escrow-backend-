const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let users = [];
let transactions = [];

// LOGIN (simple demo auth)
app.post("/login", (req, res) => {
  const { username } = req.body;

  let user = users.find(u => u.username === username);

  if (!user) {
    user = { id: Date.now(), username };
    users.push(user);
  }

  res.json(user);
});

// CREATE ESCROW
app.post("/escrow", (req, res) => {
  const { buyer, seller, amount } = req.body;

  const tx = {
    id: Date.now(),
    buyer,
    seller,
    amount,
    status: "HELD"
  };

  transactions.push(tx);
  res.json(tx);
});

// GET ALL TRANSACTIONS
app.get("/escrows", (req, res) => {
  res.json(transactions);
});

app.listen(3000, () => {
  console.log("Escrow backend running on port 3000");
});
