//dependencies
//---
const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

//set up express app to handle data parsing
app.use(express.urlencoded({ extend: true }));
app.use(express.json());

//data
const rsvp = [
  {
    customerName: "Eric",
    customerEmail: "eric@geocities.com",
    customerId: "32098",
    customerPhone: "312-222-3331"
  },
  {
    customerName: "Kevin",
    customerEmail: "kevin@aol.com",
    customerId: "23432",
    customerPhone: "224-432-2342"
  }
];
const waitlist = [
  {
    customerName: "tony",
    customerEmail: "tony@whiteclaw.com",
    customerId: "09873",
    customerPhone: "312-439-3520"
  },
  {
    customerName: "rachel",
    customerEmail: "rachel@hanggeuppe.com",
    customerId: "59495",
    customerPhone: "224-483-2900"
  }
];

//routes

//gen route
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

//api get routes

//rsvp
app.get("/api/rsvp", (req, res) => {
  return res.json(rsvp);
});

//waitlist
app.get("/api/waitlist", (req, res) => {
  return res.json(waitlist);
});

//tables
app.get("/tables", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/tables.html"));
});

//form
app.get("/form", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/form.html"));
});

//post route
//tables
app.post("/api/tables", (req, res) => {
  /* getting the raw data from client */
  /* format for my database */
  if (rsvp.length < 4) {
    rsvp.push(req.body);
    res.json(true);
  } else {
    waitlist.push(req.body);
    res.json(false);
  }
});

app.post("/api/clear", (req, res) => {
  rsvp.length = 0;
  waitlist.length = 0;
  res.json(true);
});

//listener
//----
app.listen(PORT, function() {
  console.log("app listening on PORTd " + PORT);
});
