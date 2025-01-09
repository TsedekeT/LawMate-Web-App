const express = require("express");
const router = express.Router();
const pool = require("../db");

router.post("/schedule", async (req, res) => {
  const { ClientID, LawyerID, AppointmentDate, AppointmentTime, Purpose } = req.body;

  if (!ClientID || !LawyerID || !AppointmentDate || !AppointmentTime || !Purpose) {
    return res.status(400).send("All fields are required");
  }

  const sql = `
    INSERT INTO appointments (ClientID, LawyerID, AppointmentDate, AppointmentTime, Purpose, Status)
    VALUES (?, ?, ?, ?, ?, 'Scheduled')`;

  try {
    const [result] = await pool.query(sql, [
      ClientID,
      LawyerID,
      AppointmentDate,
      AppointmentTime,
      Purpose,
    ]);
    res.json({ message: "Appointment scheduled", AppointmentID: result.insertId });
  } catch (err) {
    res.status(500).send("Error scheduling appointment");
  }
});

router.get("/cases", async (req, res) => {
  const sql = "SELECT * FROM cases";
  try {
    const [rows] = await pool.query(sql);
    res.json(rows);
  } catch (err) {
    res.status(500).send("Error fetching cases");
  }
});

router.post("/cases", async (req, res) => {
  const { ClientID, LawyerID, CaseDetails } = req.body;

  if (!ClientID || !LawyerID || !CaseDetails) {
    return res.status(400).send("All fields are required");
  }

  const sql = `
    INSERT INTO cases (ClientID, LawyerID, CaseDetails, Status)
    VALUES (?, ?, ?, 'Open')`;

  try {
    const [result] = await pool.query(sql, [ClientID, LawyerID, CaseDetails]);
    res.json({ message: "Case created", CaseID: result.insertId });
  } catch (err) {
    res.status(500).send("Error creating case");
  }
});

module.exports = router;