const CACHE_NAME = 'sitzplan-cache-v1';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json'
];

// Installieren und Cachen der Dateien
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Offline-Abruf (Network falling back to cache)
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Gibt die Cache-Version zurück, wenn vorhanden, ansonsten hole aus dem Netz
        return response || fetch(event.request);
      })
  );
});
