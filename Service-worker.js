const CACHE_NAME = 'bet-bankroll-cache-v1';
const urlsToCache = [
    './',
    './index.html',
    './manifest.json',
    './style.css', // Il tuo file CSS
    './script.js', // Il tuo file JS
    './icon-192x192.png',
    './icon-512x512.png'
];

// Installazione del Service Worker
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(urlsToCache);
        })
    );
});

// Recupero dei file dalla cache
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});

// Aggiornamento della cache
self.addEventListener('activate', (event) => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then((keyList) => {
            return Promise.all(
                keyList.map((key) => {
                    if (!cacheWhitelist.includes(key)) {
                        return caches.delete(key);
                    }
                })
            );
        })
    );
});
