import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import db from "./database.js"; // ✅ Correct

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Fetch all stocks
app.get("/stocks", async (req, res) => {
  try {
    const [rows] = await db.execute(
      "SELECT * FROM stock_data ORDER BY date ASC"
    );
    res.json(rows);
  } catch (err) {
    console.error("Error fetching stocks:", err); // Log error
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ✅ Fetch stocks by trade_code (with validation)
app.get("/stocks/:trade_code", async (req, res) => {
  try {
    const tradeCode = req.params.trade_code;

    // Validate trade code (allow letters & numbers)
    if (!/^[A-Za-z0-9]+$/.test(tradeCode)) {
      return res.status(400).json({ error: "Invalid trade code format." });
    }

    const [rows] = await db.execute(
      "SELECT * FROM stock_data WHERE trade_code = ? ORDER BY date ASC",
      [tradeCode]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "No data found for the given trade code." });
    }

    res.json(rows);
  } catch (err) {
    console.error("Error fetching stock data:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ✅ Fetch unique trade codes
app.get("/getAllStringStocks", async (req, res) => {
  try {
    const [rows] = await db.execute(
      "SELECT DISTINCT UPPER(trade_code) AS trade_code FROM stock_data"
    );
    res.json(rows.map(row => row.trade_code));
  } catch (err) {
    console.error("Error fetching trade codes:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});






// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
