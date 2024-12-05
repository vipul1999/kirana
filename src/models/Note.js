const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true, // Ensure each task has a unique identifier
  },
  text: {
    type: String,
    required: true, // Task description
  },
  completed: {
    type: Boolean,
    default: false, // Indicates if the task is completed
  },
});

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true, // Note title
    },
    id: {
      type: Number,
      required: true, // Ensure each task has a unique identifier
    },
    tasks: {
      type: [taskSchema], // Array of tasks
      default: [],
    },
    completed: {
      type: Boolean,
      default: false, // Overall completion status of the note
    },
    isDeleted: {
      type: Boolean,
      default: false, // Indicates if the note is in the trash
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Note', noteSchema);
