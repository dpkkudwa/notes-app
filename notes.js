const fs = require('fs');
const chalk = require('chalk');

const addNotes = (title, body) => {
  const notes = loadNotes();
  const duplicateNote = notes.find((note) => note.title === title);
  debugger;

  if (!duplicateNote) {
    notes.push({
      title: title,
      body: body
    });
    saveNotes(notes);
    console.log(chalk.green("New Note Added"));
  }
  else {
    console.log(chalk.red('Duplicate Title'));
  }
}

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync('notes.json');
    const dataJson = dataBuffer.toString();
    return JSON.parse(dataJson);
  }
  catch (error) {
    return [];
  }
}

const saveNotes = (notes) => {
  const dataJson = JSON.stringify(notes);
  fs.writeFileSync('notes.json', dataJson);
}

const removeNote = (title) => {
  const notes = loadNotes();
  const notesPostDelete = notes.filter((note) => note.title !== title);
  if (notes.length > notesPostDelete.length) {
    saveNotes(notesPostDelete);
    console.log(chalk.bgGreen("Note deleted"));
  }
  else {
    console.log(chalk.bgRed("Note not found!!"));
  }
}

const listNotes = () => {
  console.log(chalk.cyan.bold('Your notes....'));
  const notes = loadNotes();
  notes.map(note => {
    console.log(note.title);
  });
}

const readNote = (title) => {
  const notes = loadNotes();
  const noteFound = notes.find(note => note.title === title);
  if (noteFound) {
    console.log(chalk.rgb(255, 161, 0).bold(noteFound.title));
    console.log(noteFound.body);
  }
  else {
    console.log(chalk.red('No note found!!'));
  }
}

module.exports = {
  addNotes: addNotes,
  removeNote: removeNote,
  listNotes: listNotes,
  readNote: readNote
};
