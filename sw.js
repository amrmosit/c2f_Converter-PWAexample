// Adding Service workers to convert the website to PWA
const CACHE_NAME = 'c-to-f-converter';
// Event listner for the 'install' event, triggered when the service wroker is first installed
self.addEventListener('install', event =>{
    event.waitUntil((async()=>{
        // Open (or Create) a cache with the specified name
        const cache = await caches.open(CACHE_NAME);
        // Add files to the cache for offline use
        await cache.addAll([
            '/', //Add homebage
            '/script.js', //add Java script file
            '/style.js', // add CSS file
            '/bootstrap.min.css', // add CSS bootstrap file
        ]);
    }));
});
// Even listner for the 'fetch' event, triggered for each network request made by the page