import SQLite from 'react-native-sqlite-storage';

SQLite.enablePromise(true);

const db = SQLite.openDatabase({ name: 'cart.db', location: 'default' });

export const initCartTable = async () => {
  const database = await db;
  return database.executeSql(
    `CREATE TABLE IF NOT EXISTS cart (
      id TEXT PRIMARY KEY NOT NULL,
      name TEXT NOT NULL,
      price REAL NOT NULL,
      quantity INTEGER NOT NULL
    );`
  );
};

export const addToCart = async (item: { id: string; name: string; price: number; quantity: number }) => {
  const database = await db;
  return database.executeSql(
    'INSERT OR REPLACE INTO cart (id, name, price, quantity) VALUES (?, ?, ?, ?);',
    [item.id, item.name, item.price, item.quantity]
  );
};

export const getCartItems = async () => {
  const database = await db;
  const [results] = await database.executeSql('SELECT * FROM cart;');
  const items = [];
  for (let i = 0; i < results.rows.length; i++) {
    items.push(results.rows.item(i));
  }
  return items;
};

export const removeFromCart = async (id: string) => {
  const database = await db;
  return database.executeSql('DELETE FROM cart WHERE id = ?;', [id]);
};

export const clearCart = async () => {
  const database = await db;
  return database.executeSql('DELETE FROM cart;');
};
