import express from "express";
import summarize from "./api/summarize.js";

const app = express();
app.use(express.json());
app.use(express.static("."));

app.post("/api/summarize", summarize);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
