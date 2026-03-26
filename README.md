# 🚚 Mumbai Logistics Optimizer

An interactive web-based logistics and route optimization platform built for an **Analysis of Algorithms (AOA)** project. 

This application visualizes the process of finding the optimal delivery route across Mumbai. It allows users to select a starting warehouse, dynamically plot multiple delivery points on an interactive map, and instantly generate the most efficient driving route using real-world road network data.

## ✨ Key Features
* **Interactive Mapping:** Powered by Leaflet.js and OpenStreetMap for a smooth, responsive map of Mumbai.
* **Real-Road Routing:** Utilizes Leaflet Routing Machine to snap points to actual roads and calculate realistic driving paths, rather than straight-line distances.
* **Dynamic Waypoint Entry:** Users can simply click on the map to add up to 10 delivery locations.
* **Live Calculations:** Automatically calculates and displays the total estimated driving distance (km) and travel time (minutes).
* **Responsive UI:** Clean, modern sidebar interface to manage deliveries and view route results.

## 🛠️ Tech Stack
* **Frontend:** HTML5, CSS3, Vanilla JavaScript
* **Mapping Library:** [Leaflet.js](https://leafletjs.com/)
* **Routing Engine:** [Leaflet Routing Machine](https://www.liedman.net/leaflet-routing-machine/)
* **Map Tiles:** OpenStreetMap (OSM)

## 🚀 How to Run the Project
This project runs entirely in the browser and requires no backend server or build tools.

1. Clone the repository:
   ```bash
   git clone [https://github.com/your-username/mumbai-logistics-optimizer.git](https://github.com/your-username/mumbai-logistics-optimizer.git)
