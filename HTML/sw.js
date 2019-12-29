this.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open('v1').then(function(cache){
            return cache.addAll([
                '/sw-test/',
                '/sw-test/index.html',
                '/sw-test/style.css',
                '/sw-test/app.js',
                '/sw-test/image-list.js',
                '/sw-test/star-wars-logo.jpg',
                '/sw-test/gallery/',
                '/sw-test/gallery/bountyHunters.jpg',
                '/sw-test/gallery/myLittleVader.jpg',
                '/sw-test/gallery/snowTroopers.jpg'
            ])
        })
    )
})

this.addEventListener('fetch', function(event){
    event.respondWith(
        caches.match(event.request).then(function(resp){
            return resp || fetch(event.request).then(function(res) {
                return caches.open('v1').then(function(cache){
                    cache.put(event.request, res.clone())
                    return res
                })
            })
        }).catch(function() {
            return caches.match('/sw-test/gallery/myLittleVader.jpg')
        })
    )
})

this.addEventListener('active', function(e) {
    let cacheWhiteList = ['v2']
    e.waitUntil(
        caches.keys().then(function(keyList){
            return Promise.all(keyList.map(function(key){
                if (cacheWhiteList.indexOf(key) === -1) {
                    return caches.delete(key)
                }
            }))
        })
    )
})