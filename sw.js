// Adding Service workers to convert the website to PWA
const CACHE_NAME = 'c-to-f-converter';
// Event listener for the 'install' event, triggered when the service worker is first installed
self.addEventListener('install', event =>{
    event.waitUntil((async()=>{
        // Open (or Create) a cache with the specified name
        const cache = await caches.open(CACHE_NAME);
        // Add files to the cache for offline use
        await cache.addAll([
            '/', //Add homepage
            '/script.js', //add Java script file
            '/style.css', // add CSS file
            '/bootstrap.min.css', // add CSS bootstrap file
        ]);
    }));
});
// Even listener for the 'fetch' event, triggered for each network request made by the page
self.addEventListener('fetch', event =>{
    event.respondWith((async()=>{
        // open cache to check for cashed resources
        const cache = await caches.open(CACHE_NAME);

        try {
            // Try to fetch the resources from the network
            const fetchResponse = await fetch(event.request);
            // If successful, store the network response in the cache for future use
            cache.put (event.request, fetchResponse.clone());

            // return the network response to the page
            return fetchResponse;
        } catch (e) {
            // If the network request fails (e.g., offline), try to fetch from the cache
            const cachedResponse = await cache.match(event.request);
            // If the resource is found in the cache, return it
            if (cachedResponse){
                return cachedResponse
            } else {
                // If the resource is not available in the cache, return a custom error response
                return new Response ('Network error occurred and no cache available', {
                    status:408, // Request Timeout status
                    statusText: 'Network error occurred'
                });
            }
        }
    })());
});