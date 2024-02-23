// main.js
const fs = require("fs");
const { dialog } = require("electron").remote;

const categorySelect = document.getElementById("category");
const addRestaurantBtn = document.getElementById("addRestaurantBtn");
const restaurantsList = document.getElementById("restaurantsList");
const randomBtn = document.getElementById("randomBtn");
const resultDiv = document.getElementById("result");

let restaurants = [];

// Load saved restaurants from file if exists
fs.readFile("restaurants.json", (err, data) => {
  if (!err) {
    restaurants = JSON.parse(data);
    renderRestaurants();
  }
});

// Render restaurants list
function renderRestaurants() {
  restaurantsList.innerHTML = "";
  restaurants
    .filter((restaurant) => restaurant.category === categorySelect.value)
    .forEach((restaurant) => {
      const li = document.createElement("li");
      li.textContent = restaurant.name;
      restaurantsList.appendChild(li);
    });
}

// Add restaurant
addRestaurantBtn.addEventListener("click", () => {
  const name = prompt("식당 이름을 입력하세요:");
  if (name) {
    restaurants.push({ name, category: categorySelect.value, menu: [] });
    renderRestaurants();
    saveRestaurants();
  }
});

// Randomly pick a restaurant
randomBtn.addEventListener("click", () => {
  const categoryRestaurants = restaurants.filter(
    (restaurant) => restaurant.category === categorySelect.value
  );
  const randomIndex = Math.floor(Math.random() * categoryRestaurants.length);
  const selectedRestaurant = categoryRestaurants[randomIndex];
  resultDiv.textContent = `추천: ${selectedRestaurant.name}`;
});

// Save restaurants to file
function saveRestaurants() {
  fs.writeFile("restaurants.json", JSON.stringify(restaurants), (err) => {
    if (err) {
      console.error("Error saving restaurants:", err);
    }
  });
}
