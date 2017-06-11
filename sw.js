// sw.js

// config cache
const CACHE_NAME = 'my-site-cache-assets';
const urlsToCache = [
    '/',
    'index.html',
    '/favicon.ico',
    '/assets/rubber-duck.png'
];

// install a service worker
self.addEventListener('install', function(event) {
    // Perform install steps
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(function(cache) {
            console.log('Opened cache');
            return cache.addAll(urlsToCache);
        })
    );
});

// cache and return request
self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
            .then(function(response) {
            // Cache hit - return response
            if (response) {
                return response;
            }
                return fetch(event.request);
            }
        )
    );
});

// update service worker
self.addEventListener('activate', function(event) {

  const cacheWhitelist = ['my-site-cache-assets'];

  event.waitUntil(
    caches.keys().then(function(cacheNames) {
        console.log(cacheNames);
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});