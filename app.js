// Contributed dependencies.
const yargs = require('yargs');

// Custom dependencies.
const notes = require('./notes');

const log = console.log;

// Create add command.
yargs.command({
  command: 'add',
  describe: 'Add a new note',
  builder: {
    title: {
      describe: 'Note Title',
      demandOption: true,
      type: 'string'
    },
    body: {
      describe: 'Note Body',
      demandOption: true,
      type: 'string'
    }
  },
  handler(argv) {
    notes.addNotes(argv.title, argv.body);
  }
});

// Create remove command.
yargs.command({
  command: 'remove',
  describe: 'Removes a note',
  builder: {
    title: {
      describe: 'Note title to Remove',
      demandOption: true,
      type: 'string'
    }
  },
  handler(argv) {
    notes.removeNote(argv.title);
  }
});

// Create list command.
yargs.command({
  command: 'list',
  describe: 'Lists the notes',
  handler() {
    notes.listNotes();
  }
})

// Create read command.
yargs.command({
  command: 'read',
  describe: 'Reads a note',
  builder: {
    title: {
      describe: 'Note Title to Read',
      type: 'string',
      demandOption: true,
    }
  },
  handler(argv) {
    notes.readNote(argv.title);
  }
});

yargs.parse();
