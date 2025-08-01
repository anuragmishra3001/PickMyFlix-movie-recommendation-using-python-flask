// Global variables
let allMovies = [];
let selectedGenres = [];

// DOM elements
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const searchResults = document.getElementById('searchResults');
const moviesGrid = document.getElementById('moviesGrid');
const recommendationsGrid = document.getElementById('recommendationsGrid');
const getRecommendationsBtn = document.getElementById('getRecommendationsBtn');
const movieModal = document.getElementById('movieModal');
const modalContent = document.getElementById('modalContent');
const closeModal = document.querySelector('.close');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

// API base URL
const API_BASE = '/api';

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    loadAllMovies();
    setupEventListeners();
    setupNavigation();
});

// Setup event listeners
function setupEventListeners() {
    // Search functionality
    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });

    // Recommendations
    getRecommendationsBtn.addEventListener('click', getRecommendations);
    
    // Genre selection
    document.querySelectorAll('.genre-tag').forEach(tag => {
        tag.addEventListener('click', toggleGenre);
    });

    // Modal
    closeModal.addEventListener('click', closeMovieModal);
    window.addEventListener('click', function(e) {
        if (e.target === movieModal) {
            closeMovieModal();
        }
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Setup responsive navigation
function setupNavigation() {
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
}

// Load all movies
async function loadAllMovies() {
    try {
        showLoading(moviesGrid);
        const response = await fetch(`${API_BASE}/movies`);
        allMovies = await response.json();
        displayMovies(allMovies, moviesGrid);
    } catch (error) {
        console.error('Error loading movies:', error);
        showError(moviesGrid, 'Failed to load movies');
    }
}

// Perform search
async function performSearch() {
    const query = searchInput.value.trim();
    if (!query) {
        searchResults.innerHTML = '';
        return;
    }

    try {
        showLoading(searchResults);
        const response = await fetch(`${API_BASE}/movies/search?q=${encodeURIComponent(query)}`);
        const movies = await response.json();
        displayMovies(movies, searchResults);
        
        if (movies.length === 0) {
            searchResults.innerHTML = '<div class="text-center py-12 animate__animated animate__fadeIn"><div class="inline-block p-6 rounded-full bg-gradient-to-br from-dark-light to-dark-darker shadow-neon mb-4 border border-accent-purple"><i class="fas fa-film text-accent-yellow text-4xl"></i></div><p class="text-white text-lg font-semibold bg-gradient-to-r from-primary-light to-secondary-light bg-clip-text text-transparent">No movies found matching your search.</p></div>';
        }
    } catch (error) {
        console.error('Error searching movies:', error);
        showError(searchResults, 'Failed to search movies');
    }
}

// Toggle genre selection
function toggleGenre() {
    const genre = this.dataset.genre;
    this.classList.toggle('selected');
    
    if (this.classList.contains('selected')) {
        selectedGenres.push(genre);
    } else {
        selectedGenres = selectedGenres.filter(g => g !== genre);
    }
}

// Get recommendations
async function getRecommendations() {
    if (selectedGenres.length === 0) {
        alert('Please select at least one genre to get recommendations.');
        return;
    }

    try {
        showLoading(recommendationsGrid);
        const genresParam = selectedGenres.join(',');
        const response = await fetch(`${API_BASE}/movies/recommendations?genres=${encodeURIComponent(genresParam)}`);
        const recommendations = await response.json();
        displayMovies(recommendations, recommendationsGrid);
    } catch (error) {
        console.error('Error getting recommendations:', error);
        showError(recommendationsGrid, 'Failed to get recommendations');
    }
}

// Display movies in a grid
function displayMovies(movies, container) {
    if (!movies || movies.length === 0) {
        container.innerHTML = '<div class="text-center py-12 animate__animated animate__fadeIn"><div class="inline-block p-6 rounded-full bg-gradient-to-br from-dark-light to-dark-darker shadow-neon mb-4 border border-accent-purple"><i class="fas fa-film text-accent-yellow text-4xl"></i></div><p class="text-white text-lg font-semibold bg-gradient-to-r from-primary-light to-secondary-light bg-clip-text text-transparent">No movies found.</p></div>';
        return;
    }

    const moviesHTML = movies.map(movie => createMovieCard(movie)).join('');
    container.innerHTML = moviesHTML;

    // Add click event listeners to movie cards
    container.querySelectorAll('.movie-card').forEach(card => {
        card.addEventListener('click', function() {
            const movieId = this.dataset.movieId;
            openMovieModal(movieId);
        });
    });
}

// Create movie card HTML
function createMovieCard(movie) {
    // Create different gradient styles for genre tags
    const gradients = [
        'from-primary-light to-primary-dark',
        'from-secondary-light to-secondary-dark',
        'from-accent-purple to-primary-dark',
        'from-accent-yellow to-secondary-dark',
        'from-primary-dark to-accent-purple'
    ];
    
    const genresHTML = movie.genre.map((genre, index) => {
        const gradientClass = gradients[index % gradients.length];
        return `<span class="inline-block bg-gradient-to-r ${gradientClass} text-white text-xs font-semibold px-2 py-1 rounded-full mr-1 mb-1 shadow-sm">${genre}</span>`;
    }).join('');

    return `
        <div class="movie-card bg-gradient-to-br from-dark-light to-dark-darker text-white rounded-xl overflow-hidden shadow-neon transition-all duration-300 hover:shadow-xl hover:scale-105 animate__animated animate__fadeIn border border-accent-purple" data-movie-id="${movie.id}">
            <div class="relative overflow-hidden">
                <img src="${movie.poster}" alt="${movie.title}" class="w-full h-80 object-cover transition-transform duration-700 hover:scale-110">
                <div class="absolute inset-0 bg-gradient-to-t from-dark-darker to-transparent opacity-60"></div>
                <div class="absolute bottom-0 left-0 right-0 p-4">
                    <div class="flex items-center gap-1 text-accent-yellow mb-1">
                        <i class="fas fa-star"></i>
                        <span class="font-medium">${movie.rating}</span>
                    </div>
                </div>
            </div>
            <div class="p-5">
                <h3 class="text-xl font-semibold mb-2 bg-gradient-to-r from-primary-light via-accent-yellow to-secondary-light bg-clip-text text-transparent">${movie.title}</h3>
                <div class="mb-3 text-sm text-gray-300">
                    <span>${movie.year}</span>
                </div>
                <div class="flex flex-wrap">
                    ${genresHTML}
                </div>
            </div>
        </div>
    `;
}

// Open movie modal
async function openMovieModal(movieId) {
    try {
        const response = await fetch(`${API_BASE}/movies/${movieId}`);
        const movie = await response.json();
        
        if (movie.error) {
            alert('Movie not found');
            return;
        }

        const modalHTML = createModalContent(movie);
        modalContent.innerHTML = modalHTML;
        movieModal.style.display = 'block';
        document.body.style.overflow = 'hidden';

        // Setup rating functionality
        setupRatingStars(movieId);
    } catch (error) {
        console.error('Error loading movie details:', error);
        alert('Failed to load movie details');
    }
}

// Create modal content
function createModalContent(movie) {
    // Create different gradient styles for genre tags
    const gradients = [
        'from-primary-light to-primary-dark',
        'from-secondary-light to-secondary-dark',
        'from-accent-purple to-primary-dark',
        'from-accent-yellow to-secondary-dark',
        'from-primary-dark to-accent-purple'
    ];
    
    const genresHTML = movie.genre.map((genre, index) => {
        const gradientClass = gradients[index % gradients.length];
        return `<span class="inline-block bg-gradient-to-r ${gradientClass} text-white text-xs font-semibold px-2 py-1 rounded-full mr-1 mb-1 shadow-sm">${genre}</span>`;
    }).join('');

    return `
        <div class="flex flex-col md:flex-row gap-6 animate__animated animate__fadeIn">
            <div class="relative">
                <img src="${movie.poster}" alt="${movie.title}" class="w-full md:w-64 h-96 object-cover rounded-lg shadow-neon border border-accent-purple">
                <div class="absolute inset-0 bg-gradient-to-t from-dark-darker to-transparent opacity-30 rounded-lg"></div>
            </div>
            <div class="flex-1">
                <h3 class="text-2xl font-bold mb-3 bg-gradient-to-r from-primary-light via-accent-yellow to-secondary-light bg-clip-text text-transparent">${movie.title}</h3>
                <div class="flex justify-between items-center mb-4 text-gray-300">
                    <span class="text-lg">${movie.year}</span>
                    <div class="flex items-center gap-1 text-accent-yellow">
                        <i class="fas fa-star"></i>
                        <span class="font-medium">${movie.rating}</span>
                    </div>
                </div>
                <div class="flex flex-wrap mb-4">
                    ${genresHTML}
                </div>
                <p class="text-gray-300 mb-6 leading-relaxed">${movie.description}</p>
                <div class="bg-gradient-to-br from-dark-light to-dark-darker p-4 rounded-lg border border-accent-purple shadow-neon-sm">
                    <h4 class="text-lg font-semibold mb-3 bg-gradient-to-r from-accent-purple to-accent-yellow bg-clip-text text-transparent">Rate this movie:</h4>
                    <div class="rating-stars flex gap-2" data-movie-id="${movie.id}">
                        <i class="fas fa-star star text-2xl text-gray-600 hover:text-accent-yellow transition-colors duration-200 cursor-pointer" data-rating="1"></i>
                        <i class="fas fa-star star text-2xl text-gray-600 hover:text-accent-yellow transition-colors duration-200 cursor-pointer" data-rating="2"></i>
                        <i class="fas fa-star star text-2xl text-gray-600 hover:text-accent-yellow transition-colors duration-200 cursor-pointer" data-rating="3"></i>
                        <i class="fas fa-star star text-2xl text-gray-600 hover:text-accent-yellow transition-colors duration-200 cursor-pointer" data-rating="4"></i>
                        <i class="fas fa-star star text-2xl text-gray-600 hover:text-accent-yellow transition-colors duration-200 cursor-pointer" data-rating="5"></i>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Setup rating stars
function setupRatingStars(movieId) {
    const stars = document.querySelectorAll('.rating-stars .star');
    let currentRating = 0;

    stars.forEach(star => {
        star.addEventListener('mouseenter', function() {
            const rating = parseInt(this.dataset.rating);
            highlightStars(rating);
        });

        star.addEventListener('mouseleave', function() {
            highlightStars(currentRating);
        });

        star.addEventListener('click', function() {
            const rating = parseInt(this.dataset.rating);
            currentRating = rating;
            submitRating(movieId, rating);
        });
    });
}

// Highlight stars
function highlightStars(rating) {
    const stars = document.querySelectorAll('.rating-stars .star');
    stars.forEach((star, index) => {
        if (index < rating) {
            star.classList.remove('text-gray-600');
            star.classList.add('text-accent-yellow');
        } else {
            star.classList.remove('text-accent-yellow');
            star.classList.add('text-gray-600');
        }
    });
}

// Submit rating
async function submitRating(movieId, rating) {
    try {
        const response = await fetch(`${API_BASE}/ratings`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                movie_id: movieId,
                rating: rating
            })
        });

        const result = await response.json();
        
        if (result.message) {
            showNotification('Rating submitted successfully!', 'success');
        } else {
            showNotification('Failed to submit rating', 'error');
        }
    } catch (error) {
        console.error('Error submitting rating:', error);
        showNotification('Failed to submit rating', 'error');
    }
}

// Close movie modal
function closeMovieModal() {
    movieModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Show loading spinner
function showLoading(container) {
    container.innerHTML = `
        <div class="flex justify-center items-center py-12 animate__animated animate__fadeIn">
            <div class="w-16 h-16 border-4 border-accent-yellow border-t-transparent border-b-accent-purple rounded-full animate-spin shadow-neon"></div>
        </div>
    `;
}

// Show error message
function showError(container, message) {
    container.innerHTML = `
        <div class="text-center py-12 animate__animated animate__fadeIn">
            <div class="inline-block p-6 rounded-full bg-gradient-to-br from-red-500 to-red-700 shadow-neon mb-4">
                <i class="fas fa-exclamation-circle text-white text-4xl"></i>
            </div>
            <p class="text-red-400 text-lg font-semibold">${message}</p>
        </div>
    `;
}

// Show notification
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `fixed top-5 right-5 px-6 py-3 rounded-lg text-white font-semibold shadow-neon z-50 animate__animated animate__fadeInRight ${type === 'success' ? 'bg-gradient-to-r from-primary-light to-secondary-light border border-accent-yellow' : 'bg-gradient-to-r from-red-500 to-red-700 border border-red-300'}`;
    
    // Add icon and message
    notification.innerHTML = `
        <div class="flex items-center gap-3">
            <i class="fas ${type === 'success' ? 'fa-check-circle text-accent-yellow' : 'fa-exclamation-circle text-red-300'}"></i>
            <span>${message}</span>
        </div>
    `;

    document.body.appendChild(notification);

    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.classList.remove('animate__fadeInRight');
        notification.classList.add('animate__fadeOutRight');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 500);
    }, 3000);
}

// Smooth scroll to section
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    .no-results {
        text-align: center;
        padding: 2rem;
        color: #666;
        font-style: italic;
    }
    
    .error {
        text-align: center;
        padding: 2rem;
        color: #e74c3c;
    }
    
    /* Mobile navigation styles */
    @media (max-width: 768px) {
        .nav-menu {
            position: fixed;
            left: -100%;
            top: 70px;
            flex-direction: column;
            background-color: white;
            width: 100%;
            text-align: center;
            transition: 0.3s;
            box-shadow: 0 10px 27px rgba(0, 0, 0, 0.05);
            padding: 2rem 0;
        }
        
        .nav-menu.active {
            left: 0;
        }
        
        .nav-menu .nav-link {
            margin: 1rem 0;
        }
        
        .hamburger.active span:nth-child(1) {
            transform: rotate(-45deg) translate(-5px, 6px);
        }
        
        .hamburger.active span:nth-child(2) {
            opacity: 0;
        }
        
        .hamburger.active span:nth-child(3) {
            transform: rotate(45deg) translate(-5px, -6px);
        }
    }
`;
document.head.appendChild(style);