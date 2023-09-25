// src/db.js
import Dexie from "dexie";

const db = new Dexie("SettingsDatabase");

db.version(1).stores({
  settings: "++id,timezone,language",
});

export default db;
