import fs from 'node:fs/promises';
const DB_PATH = new URL('./db.json', import.meta.url).pathname;


// the function below is a helper function to read the db.json file it 
// reads the file and returns the parsed JSON object
export const getDB = async () => {
    try {
        const db = await fs.readFile(DB_PATH, 'utf-8');
        return JSON.parse(db);
    } catch (e) {
        console.log('error in getDB', e);
    }
}

// the function below takes in a db object and writes it to the db.json file
export const saveDB = async (db) => {
    await fs.writeFile(DB_PATH, JSON.stringify(db, null, 2));
    return db;
}

// uses the getDB function to read the current db.json file,
// then adds the new note to the notes array, and then uses the saveDB function
export const insertDB = async (note) => {
    const db = await getDB();
    db.notes.push(note);
    await saveDB(db);
    return note;
}