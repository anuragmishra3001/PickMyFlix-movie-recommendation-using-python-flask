# PickMyFlix - Movie Recommendation System

A modern, responsive movie recommendation web application built with Flask and Tailwind CSS. Get personalized movie recommendations based on your genre preferences.

## Features

- 🎬 **Movie Database**: Browse through a curated collection of 30+ popular movies
- 🔍 **Smart Search**: Search movies by title or genre
- 🎯 **Personalized Recommendations**: Get movie suggestions based on your favorite genres
- ⭐ **Rating System**: Rate movies and see community ratings
- 📱 **Responsive Design**: Beautiful UI that works on all devices
- 🎨 **Modern Interface**: Sleek design with animations and gradients

## Tech Stack

- **Backend**: Flask (Python)
- **Frontend**: HTML5, CSS3, JavaScript
- **Styling**: Tailwind CSS
- **Icons**: Font Awesome
- **Animations**: Animate.css

## Quick Start

### Local Development

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd movie-recommendation-system
   ```

2. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

3. **Run the application**
   ```bash
   python app.py
   ```

4. **Open your browser**
   Navigate to `http://localhost:5000`

### Testing the API

Run the test script to verify all endpoints work:
```bash
python test_api.py
```

## Deployment

### Vercel Deployment

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy to Vercel**
   ```bash
   vercel
   ```

3. **Follow the prompts** to connect your GitHub repository

The `vercel.json` file is already configured for Flask deployment.

### Other Platforms

This Flask app can be deployed on any platform that supports Python:

- **Heroku**: Add a `Procfile` with `web: python app.py`
- **Railway**: Connect your GitHub repo
- **Render**: Deploy as a web service
- **DigitalOcean App Platform**: Deploy directly from GitHub

## API Endpoints

### Movies
- `GET /api/movies` - Get all movies
- `GET /api/movies/search?q=<query>` - Search movies by title or genre
- `GET /api/movies/recommendations?genres=<genre1,genre2>` - Get recommendations based on genres
- `GET /api/movies/<id>` - Get a specific movie by ID

### Ratings
- `POST /api/ratings` - Add a movie rating
  ```json
  {
    "movie_id": 1,
    "rating": 5
  }
  ```

## Movie Database

The application includes 30 popular movies across various genres:

- **Action**: The Dark Knight, The Matrix, Gladiator, The Avengers
- **Drama**: The Shawshank Redemption, The Godfather, Forrest Gump
- **Sci-Fi**: Inception, Interstellar, The Matrix, Back to the Future
- **Crime**: Pulp Fiction, Goodfellas, The Silence of the Lambs
- **Comedy**: The Grand Budapest Hotel, La La Land, Parasite
- **Adventure**: The Lord of the Rings, Jurassic Park, Back to the Future
- **Romance**: Titanic, Casablanca, La La Land
- **Horror**: The Shining
- **Animation**: The Lion King

## Project Structure

```
├── app.py                 # Main Flask application
├── requirements.txt       # Python dependencies
├── vercel.json           # Vercel deployment configuration
├── test_api.py           # API testing script
├── templates/
│   └── index.html        # Main HTML template
├── static/
│   ├── css/
│   │   └── style.css     # Custom CSS styles
│   ├── js/
│   │   ├── script.js     # Main JavaScript functionality
│   │   └── firebase-config.js  # Firebase configuration (commented out)
│   └── images/
│       ├── posters/      # Movie poster images
│       └── placeholder.svg  # Default poster placeholder
└── README.md             # This file
```

## Features in Detail

### 1. Movie Browsing
- View all movies in a responsive grid layout
- Each movie card shows title, year, rating, and genres
- Click on any movie to see detailed information

### 2. Search Functionality
- Search by movie title or genre
- Real-time results as you type
- No results message for empty searches

### 3. Recommendations
- Select your favorite genres from the available options
- Get personalized movie recommendations
- Recommendations are scored based on genre matches

### 4. Movie Details
- Detailed view with full description
- Star rating system (1-5 stars)
- Responsive modal design

### 5. Responsive Design
- Mobile-first approach
- Hamburger menu for mobile navigation
- Optimized for all screen sizes

## Customization

### Adding New Movies

To add new movies, edit the `MOVIES_DATA` list in `app.py`:

```python
{
    "id": 31,
    "title": "Your Movie Title",
    "genre": ["Action", "Adventure"],
    "year": 2024,
    "rating": 8.5,
    "poster": "/static/images/posters/your_movie.svg",
    "description": "Movie description here."
}
```

### Styling

The application uses Tailwind CSS for styling. You can customize:

- Colors in the Tailwind config in `index.html`
- Custom CSS in `static/css/style.css`
- Animations and transitions

### Firebase Integration (Optional)

The app includes Firebase configuration files for future authentication and database features. To enable:

1. Set up a Firebase project
2. Update `static/js/firebase-config.js` with your credentials
3. Uncomment Firebase scripts in `index.html`
4. Update `static/js/script.js` to use Firebase functions

## Troubleshooting

### Common Issues

1. **Port already in use**
   ```bash
   # Kill the process using port 5000
   lsof -ti:5000 | xargs kill -9
   ```

2. **Module not found errors**
   ```bash
   pip install -r requirements.txt
   ```

3. **Vercel deployment fails**
   - Ensure `vercel.json` is in the root directory
   - Check that `app.py` is the main file
   - Verify all dependencies are in `requirements.txt`

### API Testing

If you encounter issues with the API:

1. Run the test script: `python test_api.py`
2. Check the Flask server logs for errors
3. Verify all endpoints return 200 status codes

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

If you encounter any issues or have questions:

1. Check the troubleshooting section above
2. Review the API documentation
3. Test the endpoints using `test_api.py`
4. Open an issue on GitHub

---

**Enjoy discovering your next favorite movie! 🎬✨**