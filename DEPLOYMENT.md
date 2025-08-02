# Deployment Guide

This guide will help you deploy your Movie Recommendation System to various platforms.

## Vercel Deployment (Recommended)

Vercel is the easiest platform to deploy this Flask application.

### Prerequisites
- A GitHub account
- Your code pushed to a GitHub repository

### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

### Step 2: Deploy
1. Navigate to your project directory
2. Run the deployment command:
```bash
vercel
```

3. Follow the prompts:
   - Link to existing project? → No
   - What's your project's name? → movie-recommendation-system
   - In which directory is your code located? → ./
   - Want to override the settings? → No

### Step 3: Configure
The `vercel.json` file is already configured for Flask deployment:
```json
{
  "version": 2,
  "builds": [
    {
      "src": "app.py",
      "use": "@vercel/python"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "app.py"
    }
  ]
}
```

### Step 4: Access Your App
After deployment, Vercel will provide you with a URL like:
`https://your-app-name.vercel.app`

## Alternative Deployment Options

### Heroku

1. **Create a Procfile** in your root directory:
```
web: python app.py
```

2. **Install Heroku CLI** and deploy:
```bash
heroku create your-app-name
git push heroku main
```

### Railway

1. Connect your GitHub repository to Railway
2. Railway will automatically detect it's a Python app
3. Deploy with one click

### Render

1. Create a new Web Service
2. Connect your GitHub repository
3. Set build command: `pip install -r requirements.txt`
4. Set start command: `python app.py`

### DigitalOcean App Platform

1. Create a new app
2. Connect your GitHub repository
3. Select Python as the environment
4. Deploy automatically

## Environment Variables

If you need to set environment variables (for future features):

### Vercel
```bash
vercel env add VARIABLE_NAME
```

### Heroku
```bash
heroku config:set VARIABLE_NAME=value
```

## Troubleshooting Deployment

### Common Issues

1. **Build Fails**
   - Check that `requirements.txt` includes all dependencies
   - Ensure `app.py` is the main file
   - Verify Python version compatibility

2. **App Not Loading**
   - Check the deployment logs
   - Verify the port configuration
   - Ensure all static files are included

3. **API Endpoints Not Working**
   - Test locally first with `python app.py`
   - Check CORS configuration
   - Verify route definitions

### Testing After Deployment

1. **Test the main page**: Visit your deployment URL
2. **Test the API**: Try `/api/movies` endpoint
3. **Test search**: Use the search functionality
4. **Test recommendations**: Select genres and get recommendations

## Performance Optimization

### For Production

1. **Enable Caching**:
   ```python
   from flask_caching import Cache
   
   cache = Cache(app, config={'CACHE_TYPE': 'simple'})
   ```

2. **Add Error Handling**:
   ```python
   @app.errorhandler(404)
   def not_found(error):
       return jsonify({'error': 'Not found'}), 404
   ```

3. **Optimize Static Files**:
   - Compress images
   - Minify CSS/JS
   - Use CDN for external resources

## Monitoring

### Vercel Analytics
- Built-in analytics dashboard
- Performance monitoring
- Error tracking

### Custom Monitoring
Add logging to your Flask app:
```python
import logging
logging.basicConfig(level=logging.INFO)
```

## Security Considerations

1. **HTTPS**: All modern platforms provide HTTPS by default
2. **CORS**: Configure CORS properly for production
3. **Rate Limiting**: Consider adding rate limiting for API endpoints
4. **Input Validation**: Validate all user inputs

## Scaling

### Vercel
- Automatic scaling
- Edge functions for global performance
- Serverless architecture

### Other Platforms
- Most platforms offer auto-scaling
- Consider database solutions for larger datasets
- Implement caching strategies

---

**Your app should now be live and accessible worldwide! 🌍** 