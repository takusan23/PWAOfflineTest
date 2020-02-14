// キャッシュしたいふぁいる
const cacheDataList = [
    'index.html',
    'app.js',
];

// 名前。更新するときに使う？
const version = '2020/02/15'

self.addEventListener('install', function (e) {
    e.waitUntil(
        caches.open(version).then(function (cache) {
            return cache.addAll(cacheDataList);
        })
    );
});

self.addEventListener('fetch', function (event) {
    caches.open(version).then(function (cache) {
        return cache.match(event.request).then(function (response) {
            return response || fetch(event.request);
        });
    })
});

self.addEventListener('activate', function (event) {
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.map(function (cacheName) {
                    if (cacheName !== version) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});