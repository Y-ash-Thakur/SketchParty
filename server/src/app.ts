import express from "express"

const app = express();

app.get("/", (_, res) => {
  res.send("SketchParty Server is running 🚀")
});

export default app;