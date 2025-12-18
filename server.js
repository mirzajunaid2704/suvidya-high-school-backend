const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const DATA_FILE = path.join(__dirname, "data", "enquiries.json");

// create file if not exists
if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, "[]");
}

/* SAVE ENQUIRY */
app.post("/api/enquiry", (req, res) => {
  const enquiries = JSON.parse(fs.readFileSync(DATA_FILE));
  enquiries.push({ ...req.body, time: new Date() });
  fs.writeFileSync(DATA_FILE, JSON.stringify(enquiries, null, 2));
  res.json({ message: "Enquiry saved" });
});

/* GET ENQUIRIES (ADMIN) */
app.get("/api/enquiries", (req, res) => {
  const enquiries = JSON.parse(fs.readFileSync(DATA_FILE));
  res.json(enquiries);
});

/* SERVE ADMIN PAGE */
app.use("/admin", express.static(path.join(__dirname, "admin")));

app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);
