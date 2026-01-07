// regexServer.js
/*
http://localhost:3000/ac → matches ab?c

http://localhost:3000/abc → matches ab?c

http://localhost:3000/abbc → matches ab+c

http://localhost:3000/abbbc → matches ab+c

http://localhost:3000/acd → matches ab*cd

http://localhost:3000/abbbcd → matches ab*cd

http://localhost:3000/aad → matches a(ab)?d

http://localhost:3000/aabd → matches a(ab)?d

http://localhost:3000/bat → matches /a/

http://localhost:3000/butterfly → matches /.*fly$/

http://localhost:3000/dragonfly → matches /.*fly$/
*/



const express = require('express');
const app = express();
const port = 4000;

app.use(express.json());

// Example 1: `ab?c` → matches "ac" or "abc"
app.get(/ab?c/, (req, res) => {
  res.send(`Matched pattern: ab?c → You requested: ${req.url}`);
});

// Example 2: `ab+c` → matches "abc", "abbc", "abbbc", etc.
app.get(/ab+c/, (req, res) => {
  res.send(`Matched pattern: ab+c → You requested: ${req.url}`);
});

// Example 3: `ab*cd` → matches "acd", "abcd", "abbcd", "abbbcd", etc.
app.get(/ab*cd/, (req, res) => {
  res.send(`Matched pattern: ab*cd → You requested: ${req.url}`);
});

// Example 4: `a(ab)?d` → matches "aad" or "aabd"
app.get(/a(ab)?d/, (req, res) => {
  res.send(`Matched pattern: a(ab)?d → You requested: ${req.url}`);
});

// Example 5: `/a/` → matches any path with "a" in it
app.get(/a/, (req, res) => {
  res.send(`Matched pattern: /a/ → You requested: ${req.url}`);
});

// Example 6: `/.*fly$/` → matches anything ending with "fly"
app.get(/.*fly$/, (req, res) => {
  res.send(`Matched pattern: /.*fly$/ → You requested: ${req.url}`);
});

app.listen(port, () => {
  console.log(`✅ Regex API server running on http://localhost:${port}`);
});
