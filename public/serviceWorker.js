// src/serviceWorker.js

const CACHE_NAME = 'pwa-cache-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/static/js/main.js',
    '/static/css/main.css',
    '/fallback.html',
];

// Instala o Service Worker e faz o cache dos arquivos
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('Opened cache');
            return cache.addAll(urlsToCache);
        })
    );
});

// Ativa o Service Worker e limpa caches antigos
self.addEventListener('activate', (event) => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Intercepta requests para servir o conteúdo do cache
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            // Retorna o conteúdo do cache ou faz o fetch normalmente
            return response || fetch(event.request);
        })
    );
});

// Sincroniza com localStorage (exemplo simples)
self.addEventListener('sync', (event) => {
    if (event.tag === 'sync-local-storage') {
        event.waitUntil(syncLocalStorage());
    }
});

async function syncLocalStorage() {
    // Pegue os dados do localStorage
    const data = localStorage.getItem('dataKey'); // Troque 'dataKey' pela chave real

    if (data) {
        // Faça algo com os dados (exemplo: enviar para um servidor)
        console.log('Sincronizando localStorage com os dados:', data);
    }
}
