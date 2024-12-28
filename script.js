// script.js

const apiKey = 'tUUmkfDhnkBWMZ7h-_k7YXbdEl-x5_Lt7gSyL7XOGeQ';
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const imageGrid = document.getElementById('image-grid');
const loadMoreButton = document.getElementById('load-more');

let query = '';
let page = 1;

// Function to fetch images from Unsplash API
async function fetchImages() {
  if (!query) return;
  const url = https://api.unsplash.com/search/photos?page=${page}&query=${query}&client_id=${apiKey};
  const response = await fetch(url);
  const data = await response.json();

  if (data.results.length > 0) {
    displayImages(data.results);
    loadMoreButton.style.display = 'block';
  } else if (page === 1) {
    imageGrid.innerHTML = '<p>No results found. Please try a different search.</p>';
    loadMoreButton.style.display = 'none';
  }
}

// Function to display images
function displayImages(images) {
  images.forEach((image) => {
    const card = document.createElement('div');
    card.className = 'image-card';

    card.innerHTML = `
      <img src="${image.urls.small}" alt="${image.alt_description}">
      <p>Photo by <a href="${image.user.links.html}" target="_blank">${image.user.name}</a> on <a href="https://unsplash.com" target="_blank">Unsplash</a></p>
    `;

    imageGrid.appendChild(card);
  });
}

// Event listener for search button
searchButton.addEventListener('click', () => {
  query = searchInput.value.trim();
  page = 1;
  imageGrid.innerHTML = '';
  fetchImages();
});

// Event listener for load more button
loadMoreButton.addEventListener('click', () => {
  page++;
  fetchImages();
});