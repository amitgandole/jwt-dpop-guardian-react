const express = require("express");
const { jwtVerify, importJWK } = require("jose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());

// Use CORS middleware
app.use(
  cors({
    origin: "http://localhost:3000", // Allow your Angular app's origin
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
    credentials: true, // Include credentials for requests (if needed)
  })
);

const users = [{ username: "test", password: "password" }];
const ACCESS_TOKEN = "dummy-access-token";

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = users.find(
    (u) => u.username === username && u.password === password
  );
  if (!user) return res.status(401).send("Invalid credentials");

  res.json({ accessToken: ACCESS_TOKEN });
});

app.get("/secure-data", async (req, res) => {
  const authHeader = req.headers["authorization"];
  const dpopHeader = req.headers["dpop"];
  const publicKeyHeader = req.headers["x-public-key"]; // Get the public key

  if (!authHeader || !dpopHeader || !publicKeyHeader) {
    return res.status(401).send("Unauthorized");
  }

  try {
    // Extract the public key from the header
    const publicKey = JSON.parse(publicKeyHeader);
    console.log("PUBLIC KEY________", publicKey);
    const key = await importJWK(publicKey, "ES256"); // Import the public key as KeyLike object

    // Verify the DPoP proof
    const { payload } = await jwtVerify(dpopHeader, key);

    console.log("DPoP Proof Verified:", payload);

    res.json({ data: "This is secure data" });
  } catch (error) {
    res.status(403).send("Invalid DPoP proof or public key");
  }
});

app.listen(3001, () => {
  console.log("Server running on http://localhost:3001");
});
