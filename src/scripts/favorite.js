let db;

export const initializeDatabase = (callback = null) => {
  const openRequest = indexedDB.open('restowan');

  openRequest.onupgradeneeded = (e) => {
    db = e.target.result;
    const favoritesStore = db.createObjectStore('favorites', { keyPath: 'id' });
    favoritesStore.createIndex('id', 'id', { unique: true });
    favoritesStore.createIndex('name', 'name', { unique: false });
    favoritesStore.createIndex('description', 'description', { unique: false });
    favoritesStore.createIndex('pictureId', 'pictureId', { unique: false });
    favoritesStore.createIndex('city', 'city', { unique: false });
    favoritesStore.createIndex('rating', 'rating', { unique: false });
  };

  openRequest.onsuccess = (e) => {
    db = e.target.result;
    if (callback) callback();
  };
};

export const getFavorites = () => {
  const transaction = db.transaction('favorites', 'readonly');
  const store = transaction.objectStore('favorites');
  return store.getAll();
};

export const findFavoriteIndex = (id) => {
  const transaction = db.transaction('favorites', 'readonly');
  const store = transaction.objectStore('favorites');
  return store.get(id);
};

export const addFavorite = async (restaurant) => {
  db.transaction('favorites', 'readwrite')
    .objectStore('favorites')
    .add(restaurant);
};

export const removeFavorite = (id) => {
  db.transaction('favorites', 'readwrite').objectStore('favorites').delete(id);
};
