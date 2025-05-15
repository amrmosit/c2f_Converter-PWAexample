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
self.addEventListener('fetch', event =>{
    event.respondWith((async()=>{
        // open cache to check for cashed resources
        const cashe = await caches.open(CACHE_NAME);

        try {
            // Try to fetch the resources from the network
            const fetchResponse = await fetch(event.request);
            // If successful, store the network response in the cache for future use
            cache.put (event.request, fetchResponse.clone());

            // return the network response to the page
            return fetch.fetchResponse;
        } catch (e) {
            // If the network request fails (e.g., offline), try to fetch from the cache
            const cashedResponse = await cache.match(event.request);
            // If the resource is found in the cashe, return it
            if (cashedResponse){
                return cashedResponse
            } else {
                // If the resource is not available in the cahe, return a customer error response
                return new Response ('Network error occured and no cache available', {
                    status:408, // Request Timeout status
                    statusText: 'Network error occured'
                });
            }
        }
    }));
});