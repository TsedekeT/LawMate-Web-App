const express = require("express");
const router = express.Router();
const pool = require("../db");

// Create the "cases" table if it doesn't exist
router.get("/install", async (req, res) => {
  const casesTable = `
    CREATE TABLE IF NOT EXISTS cases (
      CaseID INT AUTO_INCREMENT PRIMARY KEY,
      ClientID INT NOT NULL,
      LawyerID INT NOT NULL,
      Status ENUM('Open', 'Closed', 'In Progress') DEFAULT 'Open',
      CaseDetails TEXT NOT NULL,
      CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`;

  try {
    await pool.query(casesTable);
    res.send("Cases table created successfully");
  } catch (err) {
    console.error("Error creating the cases table:", err);
    res.status(500).send("Error creating the cases table");
  }
});

// Add a new case
router.post("/addCase", async (req, res) => {
  const { ClientID, LawyerID, CaseDetails } = req.body;
  if (!ClientID || !LawyerID || !CaseDetails) {
    return res.status(400).send("All fields are required");
  }

  const sqlAddCase = `
    INSERT INTO cases (ClientID, LawyerID, CaseDetails, Status)
    VALUES (?, ?, ?, 'Open')`;

  try {
    await pool.query(sqlAddCase, [ClientID, LawyerID, CaseDetails]);
    res.send("Case added successfully");
  } catch (err) {
    console.error("Error adding the case:", err);
    res.status(500).send("Error adding the case");
  }
});

// Update the status of a case
router.put("/updateCaseStatus/:id", async (req, res) => {
  const { id } = req.params;
  const { Status } = req.body;

  if (!Status) {
    return res.status(400).send("Status field is required");
  }

  const sqlUpdateStatus = `
    UPDATE cases
    SET Status = ?
    WHERE CaseID = ?`;

  try {
    const [result] = await pool.query(sqlUpdateStatus, [Status, id]);
    if (result.affectedRows === 0) {
      res.status(404).send("Case not found");
    } else {
      res.send("Case status updated successfully");
    }
  } catch (err) {
    console.error("Error updating case status:", err);
    res.status(500).send("Error updating case status");
  }
});

// Get details of a case
router.get("/getCase/:id", async (req, res) => {
  const { id } = req.params;
  const sqlGetCase = `
    SELECT * FROM cases
    WHERE CaseID = ?`;

  try {
    const [rows] = await pool.query(sqlGetCase, [id]);
    if (rows.length === 0) {
      res.status(404).send("Case not found");
    } else {
      res.json(rows[0]);
    }
  } catch (err) {
    console.error("Error retrieving case details:", err);
    res.status(500).send("Error retrieving case details");
  }
});

// Send a notification to the parties involved in the case
router.post("/notifyParties", (req, res) => {
  const { CaseID, Notification } = req.body;
  if (!CaseID || !Notification) {
    return res.status(400).send("CaseID and Notification fields are required");
  }
  res.send(`Notification sent to parties for CaseID: ${CaseID}`);
});

module.exports = router;
