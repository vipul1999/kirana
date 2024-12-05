const Note = require('../models/Note');

const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();


// Fetch all notes (active and deleted)
router.get('/getNotes', async (req, res) => {
  try {
    const notes = await Note.find({ isDeleted: false });
    const deletedNotes = await Note.find({ isDeleted: true });
    res.status(200).json({ notes, deletedNotes });
  } catch (error) {
    console.error('Error fetching notes:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Save notes (bulk update or insert)
router.post('/save-notes', async (req, res) => {
  const { notes, deletedNotes } = req.body;

  if (!Array.isArray(notes) || !Array.isArray(deletedNotes)) {
    return res.status(400).json({ error: 'Invalid data format' });
  }

  try {
    // Clear the database
    await Note.deleteMany({});

    // Insert new notes
    const allNotes = [
      ...notes.map((note) => ({ ...note, isDeleted: false })),
      ...deletedNotes.map((note) => ({ ...note, isDeleted: true })),
    ];
    await Note.insertMany(allNotes);

    res.status(200).json({ message: 'Notes saved successfully' });
  } catch (error) {
    console.error('Error saving notes:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
