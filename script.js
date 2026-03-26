// Initialize the map centered on Mumbai
const map = L.map('map').setView([19.0760, 72.8777], 11);

// Add the OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);

// Arrays and variables to store our data
let deliveryMarkers = [];
let routingControl = null; // Stores the route line

// Handle map clicks to add deliveries
map.on('click', function(e) {
    if (deliveryMarkers.length >= 10) {
        alert("You can only add up to 10 deliveries.");
        return;
    }

    // Add a marker to the map
    const marker = L.marker([e.latlng.lat, e.latlng.lng]).addTo(map);
    deliveryMarkers.push(marker);

    // Add it to the sidebar list
    const list = document.getElementById('delivery-list');
    const li = document.createElement('li');
    li.textContent = `Delivery ${deliveryMarkers.length}: ${e.latlng.lat.toFixed(4)}, ${e.latlng.lng.toFixed(4)}`;
    list.appendChild(li);
});

// Handle the Clear button
document.getElementById('clear-button').addEventListener('click', function() {
    // Remove markers from map
    deliveryMarkers.forEach(marker => map.removeLayer(marker));
    deliveryMarkers = []; 
    
    // Clear the routing line if it exists
    if (routingControl) {
        map.removeControl(routingControl);
        routingControl = null;
    }

    // Clear the sidebar UI
    document.getElementById('delivery-list').innerHTML = '';
    document.getElementById('results').classList.add('hidden');
});

// Handle the Calculate Route button
document.getElementById('calculate-route-button').addEventListener('click', function() {
    if (deliveryMarkers.length === 0) {
        alert("Please add at least one delivery location on the map!");
        return;
    }
    
    // Show spinner, hide previous results
    document.getElementById('spinner').classList.remove('hidden');
    document.getElementById('results').classList.add('hidden');

    // Clear previous route line before drawing a new one
    if (routingControl) {
        map.removeControl(routingControl);
    }

    // 1. Get the starting warehouse coordinates
    const warehouseSelect = document.getElementById('warehouse-select');
    const [wLat, wLng] = warehouseSelect.value.split(',').map(Number);
    
    // 2. Create an array of waypoints starting with the warehouse
    const waypoints = [L.latLng(wLat, wLng)];

    // 3. Add all delivery marker locations to the waypoints array
    deliveryMarkers.forEach(marker => {
        waypoints.push(marker.getLatLng());
    });

    // 4. Generate the route using Leaflet Routing Machine
    routingControl = L.Routing.control({
        waypoints: waypoints,
        routeWhileDragging: false,
        addWaypoints: false,
        show: false, // Hides the default text-based turn-by-turn box from the map
        lineOptions: {
            styles: [{color: '#007bff', opacity: 0.8, weight: 6}] // Blue route line
        }
    }).addTo(map);

    // 5. When the route is finished calculating, update the sidebar results
    routingControl.on('routesfound', function(e) {
        const routes = e.routes;
        const summary = routes[0].summary; // Get the summary of the first (best) route

        // Convert distance from meters to kilometers
        const distanceKm = (summary.totalDistance / 1000).toFixed(2);
        
        // Convert time from seconds to minutes
        const timeMin = Math.round(summary.totalTime / 60);

        // Update HTML
        document.getElementById('total-distance').textContent = distanceKm;
        document.getElementById('total-time').textContent = timeMin;

        // Hide spinner, show results
        document.getElementById('spinner').classList.add('hidden');
        document.getElementById('results').classList.remove('hidden');
    });

    // Handle errors (e.g., if a point is placed in the middle of the ocean)
    routingControl.on('routingerror', function() {
        alert("Could not calculate a route. Ensure points are placed near roads.");
        document.getElementById('spinner').classList.add('hidden');
    });
});
