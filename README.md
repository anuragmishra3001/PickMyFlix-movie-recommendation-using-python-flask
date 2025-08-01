# PickMyFlix - Movie Recommendation System

A modern, full-stack movie recommendation website built with HTML, CSS, JavaScript (frontend) and Python Flask (backend). Features a beautiful, mobile-responsive design with personalized movie recommendations.

## Features

- 🎬 **Movie Search**: Search movies by title or genre
- 🎯 **Personalized Recommendations**: Get movie suggestions based on your genre preferences
- ⭐ **Movie Ratings**: Rate movies with an interactive star system
- 📱 **Mobile Responsive**: Beautiful design that works on all devices
- 🎨 **Modern UI**: Clean, modern interface with smooth animations
- 🔍 **Real-time Search**: Instant search results as you type

## Tech Stack

### Frontend
- **HTML5**: Semantic markup
- **CSS3**: Modern styling with Flexbox and Grid
- **JavaScript (ES6+)**: Interactive functionality
- **Font Awesome**: Icons
- **Google Fonts**: Inter font family

### Backend
- **Python 3.8+**: Server-side logic
- **Flask**: Web framework
- **Flask-CORS**: Cross-origin resource sharing

## Project Structure

```
Movie Recommendation system/
├── app.py                 # Flask backend application
├── requirements.txt       # Python dependencies
├── README.md             # Project documentation
├── templates/
│   └── index.html        # Main HTML template
└── static/
    ├── css/
    │   └── style.css     # Stylesheets
    └── js/
        └── script.js     # JavaScript functionality
```

## Installation & Setup

### Prerequisites
- Python 3.8 or higher
- pip (Python package installer)

### Step 1: Clone or Download
Download the project files to your local machine.

### Step 2: Install Dependencies
Open a terminal/command prompt in the project directory and run:

```bash
pip install -r requirements.txt
```

### Step 3: Run the Application
Start the Flask development server:

```bash
python app.py
```

### Step 4: Access the Application
Open your web browser and navigate to:
```
http://localhost:5000
```

## Usage

### Home Page
- View the hero section with animated floating movie cards
- Click "Get Recommendations" to jump to the recommendations section

### Search Movies
- Use the search bar to find movies by title or genre
- Results update in real-time as you type

### All Movies
- Browse all available movies in a responsive grid
- Click on any movie card to view details

### Recommendations
- Select your favorite genres from the available options
- Click "Get Recommendations" to receive personalized movie suggestions
- The system matches movies based on your genre preferences

### Movie Details
- Click on any movie card to open a detailed modal
- View movie information including description and genres
- Rate movies using the interactive star rating system

## API Endpoints

The backend provides the following REST API endpoints:

- `GET /api/movies` - Get all movies
- `GET /api/movies/search?q=<query>` - Search movies
- `GET /api/movies/recommendations?genres=<genres>` - Get recommendations
- `GET /api/movies/<id>` - Get specific movie
- `POST /api/ratings` - Submit movie rating

## Features in Detail

### Responsive Design
- Mobile-first approach
- Hamburger menu for mobile devices
- Flexible grid layouts
- Touch-friendly interface

### Search Functionality
- Real-time search results
- Search by movie title or genre
- Case-insensitive matching
- Clear visual feedback

### Recommendation Engine
- Genre-based matching algorithm
- Multiple genre selection
- Personalized suggestions
- Fallback to random movies if no preferences

### Interactive Elements
- Hover effects on movie cards
- Smooth animations and transitions
- Modal dialogs for movie details
- Star rating system

### User Experience
- Loading spinners for async operations
- Error handling with user-friendly messages
- Success notifications
- Smooth scrolling navigation

## Customization

### Adding More Movies
Edit the `MOVIES_DATA` list in `app.py` to add more movies:

```python
{
    "id": 9,
    "title": "Your Movie Title",
    "genre": ["Action", "Adventure"],
    "year": 2024,
    "rating": 8.5,
    "poster": "https://via.placeholder.com/300x450/color/ffffff?text=Title",
    "description": "Movie description here."
}
```

### Styling Changes
Modify `static/css/style.css` to customize:
- Color scheme
- Typography
- Layout spacing
- Animations

### Adding Features
Extend the functionality by:
- Adding user authentication
- Implementing a database for persistent storage
- Adding more sophisticated recommendation algorithms
- Including movie trailers or external links

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Troubleshooting

### Common Issues

1. **Port already in use**
   - Change the port in `app.py`: `app.run(debug=True, host='0.0.0.0', port=5001)`

2. **CORS errors**
   - Ensure Flask-CORS is properly installed
   - Check that the API base URL in `script.js` matches your server

3. **Static files not loading**
   - Verify the file structure matches the expected layout
   - Check that Flask is serving static files correctly

4. **Search not working**
   - Ensure the backend is running
   - Check browser console for JavaScript errors
   - Verify API endpoints are accessible

## Contributing

Feel free to contribute to this project by:
- Adding new features
- Improving the UI/UX
- Optimizing performance
- Adding more movies to the database
- Enhancing the recommendation algorithm

## License

This project is open source and available under the MIT License.

## Acknowledgments

- Font Awesome for icons
- Google Fonts for typography
- Flask community for the web framework
- Placeholder.com for demo images

---

**Enjoy discovering your next favorite movie! 🎬✨**