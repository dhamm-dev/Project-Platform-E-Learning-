/**
 * CRUD sederhana di atas localStorage.
 * Bergantung pada variabel global DEFAULT_APP_DATA (dari data.js).
 */
var E_LEARN_STORAGE_KEY = "elearning_app_db_v1";

function readRawDb() {
  const raw = window.localStorage.getItem(E_LEARN_STORAGE_KEY);
  if (raw === null || raw === "") {
    return null;
  }
  try {
    return JSON.parse(raw);
  } catch (e) {
    return null;
  }
}

function writeRawDb(payload) {
  window.localStorage.setItem(E_LEARN_STORAGE_KEY, JSON.stringify(payload));
}

function cloneValue(value) {
  return JSON.parse(JSON.stringify(value));
}

function initDbIfEmpty() {
  const existing = readRawDb();
  if (existing !== null) {
    return;
  }
  if (typeof DEFAULT_APP_DATA === "undefined") {
    writeRawDb({ users: [], categories: [], courses: [], modules: [] });
    return;
  }
  writeRawDb(cloneValue(DEFAULT_APP_DATA));
}

function getAll(collectionName) {
  initDbIfEmpty();
  const db = readRawDb();
  if (!db || !Object.prototype.hasOwnProperty.call(db, collectionName)) {
    return [];
  }
  const source = db[collectionName];
  if (!Array.isArray(source)) {
    return [];
  }
  const out = [];
  let i = 0;
  while (i < source.length) {
    out.push(cloneValue(source[i]));
    i += 1;
  }
  return out;
}

function getById(collectionName, id) {
  const list = getAll(collectionName);
  const needle = Number(id);
  let i = 0;
  while (i < list.length) {
    const row = list[i];
    if (Number(row.id) === needle) {
      return row;
    }
    i += 1;
  }
  return null;
}

function nextIdForList(list) {
  let maxId = 0;
  let i = 0;
  while (i < list.length) {
    const n = Number(list[i].id);
    if (!Number.isNaN(n) && n > maxId) {
      maxId = n;
    }
    i += 1;
  }
  return maxId + 1;
}

function replaceCollection(db, collectionName, nextList) {
  const copy = cloneValue(db);
  copy[collectionName] = nextList;
  writeRawDb(copy);
}

function createRecord(collectionName, record) {
  initDbIfEmpty();
  const db = readRawDb();
  if (!db) {
    return null;
  }
  const list = Array.isArray(db[collectionName]) ? cloneValue(db[collectionName]) : [];
  const row = cloneValue(record);
  if (typeof row.id === "undefined" || row.id === null) {
    row.id = nextIdForList(list);
  }
  list.push(row);
  replaceCollection(db, collectionName, list);
  return cloneValue(row);
}

function updateRecord(collectionName, id, patch) {
  initDbIfEmpty();
  const db = readRawDb();
  if (!db || !Array.isArray(db[collectionName])) {
    return null;
  }
  const list = cloneValue(db[collectionName]);
  const needle = Number(id);
  let i = 0;
  while (i < list.length) {
    if (Number(list[i].id) === needle) {
      const keys = Object.keys(patch);
      let k = 0;
      while (k < keys.length) {
        const keyName = keys[k];
        list[i][keyName] = patch[keyName];
        k += 1;
      }
      replaceCollection(db, collectionName, list);
      return cloneValue(list[i]);
    }
    i += 1;
  }
  return null;
}

function deleteRecord(collectionName, id) {
  initDbIfEmpty();
  const db = readRawDb();
  if (!db || !Array.isArray(db[collectionName])) {
    return false;
  }
  const list = cloneValue(db[collectionName]);
  const needle = Number(id);
  const next = [];
  let i = 0;
  while (i < list.length) {
    if (Number(list[i].id) !== needle) {
      next.push(list[i]);
    }
    i += 1;
  }
  if (next.length === list.length) {
    return false;
  }
  replaceCollection(db, collectionName, next);
  return true;
}

function resetDbToSeed() {
  if (typeof DEFAULT_APP_DATA === "undefined") {
    writeRawDb({ users: [], categories: [], courses: [], modules: [] });
    return;
  }
  writeRawDb(cloneValue(DEFAULT_APP_DATA));
}
