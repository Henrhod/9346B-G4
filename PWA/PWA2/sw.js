self.addEventListener('install', function (event) {
  console.log('SW Installed');
  event.waitUntil(
    caches.open('static')  //open a cache
      .then(function (cache) {   //cache open returns a promise  
          cache.add('/');
		  cache.add('/index.html');
		  cache.add('/index.html#current');
		  cache.add('/index.html#recent');
		  cache.add('/index.html#summary');
		  cache.add('/script.js');
		  cache.add('/style.css');
		  cache.add('/manifest.json');
		  cache.add('/PWA/Fonts/Occupied Italic.otf');
		  cache.add('/PWA/Fonts/Occupied.otf');
		  cache.add('/PWA/Fonts/Targa.ttf');
		  cache.add('/PWA/Pictures/Parking.png');
		  cache.add('/PWA/Pictures/Current.png');
		  cache.add('/PWA/Pictures/Summary.png');
		  cache.add('/PWA/Pictures/icons/icon-72x72.png');
		  cache.add('/PWA/Pictures/icons/icon-96x96.png');
		  cache.add('/PWA/Pictures/icons/icon-128x128.png');
		  cache.add('/PWA/Pictures/icons/icon-144x144.png');
		  cache.add('/PWA/Pictures/icons/icon-152x152.png');
		  cache.add('/PWA/Pictures/icons/icon-192x192.png');
		  cache.add('/PWA/Pictures/icons/icon-384x384.png');
		  cache.add('/PWA/Pictures/icons/icon-512x512.png');
		 
      })
  );
});

self.addEventListener('activate', function () {  //activate and
  console.log('SW Activated');
});

self.addEventListener('fetch', function(event) {  //triggered when you fetch something in the index/html - css, script
  event.respondWith(		//respond by reaching out to the cache
    caches.match(event.request)  //match request in the cache
      .then(function(res) {
        if (res) {
          return res;
        } else {
          return fetch(event.request);
        }
      })
  );
});

