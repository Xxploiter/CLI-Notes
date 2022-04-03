import fs from 'node:fs/promises';
// const DB_PATH = new URL('../db.json', import.meta.url).pathname; // BUG this doest work in windows
// console.log(DB_PATH);
import path from 'node:path';

const DB_FILENAME = 'db.json'; // File name
const DB_DIR = './'; // Directory where db.json should be located

// Construct the full path to db.json
const DB_PATH = path.join(DB_DIR, DB_FILENAME);
// the function below is a helper function to read the db.json file it 
// reads the file and returns the parsed JSON object
export const getDB = async () => {
    try {
      // Try to read the existing database file.
      const db = await fs.readFile(DB_PATH, 'utf-8');
      return JSON.parse(db);
    } catch (error) {
      if (error.code === 'ENOENT') {
        // If the file doesn't exist, create it with an empty database.
        await fs.writeFile(DB_PATH, JSON.stringify({ notes: [] }, null, 2));
        // Now that the file has been created, read and return its content.
        const db = await fs.readFile(DB_PATH, 'utf-8');
        return JSON.parse(db);
      } else {
        // If there's an error other than "file not found," re-throw it.
        throw error;
      }
    }
  }
// the function below takes in a db object and writes it to the db.json file
export const saveDB = async (db) => {
    await fs.writeFile(DB_PATH, JSON.stringify(db, null, 2));
    return db;
}

// uses the getDB function to read the current db.json file,
// then adds the new note to the notes array, and then uses the saveDB function
export const insert = async (note) => {
    const db = await getDB();
    db.notes.push(note);
    await saveDB(db);
    return note;
}