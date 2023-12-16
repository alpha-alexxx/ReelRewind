# ReelRewind

A Website for searching movie and checking and giving reviews. This project is part of my learning path. I am following [@bradtraversy](https://github.com/[bradtraversy) [Modern JavaScript 2.0 Course](https://www.traversymedia.com/modern-javascript-2-0). The project actual name is Flixx Movie App.

### Overview

This Movie Review Website is a project developed using vanilla JavaScript and CSS, leveraging The Movie Database [(TMDb) API](https://www.themoviedb.org/settings/api) to fetch and display movie information. The website allows users to explore a vast collection of movies, read reviews, and discover new cinematic experiences.

### Features

1. #### Homepage:

-   Display a curated list of popular and trending movies.
-   Clicking on a movie poster redirects to the movie details page.

2. #### Movie Details Page:

-   Showcases detailed information about a selected movie.
-   Includes movie title, release date, overview, and average user rating.

3. #### Search Functionality:

-   Enables users to search for movies by title.
-   Dynamically updates search results as the user types.

4. #### Reviews Section:

-   Allows users to read and submit reviews for movies.
-   Provides a platform for the community to share opinions.

5. #### Responsive Design:

-   Ensures a seamless user experience across various devices.

### Getting Started

To run the project locally, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/alpha-alexxx/ReelRewind.git

```

2. Obtain an API key from The Movie Database [(TMDb)](https://www.themoviedb.org/settings/api) and replace YOUR_API_KEY in the config.js file with your actual API key.

### Dependencies

-   [TMDb API](https://www.themoviedb.org/) : The project utilizes The Movie Database API to fetch movie information.

### File Structure

```bash
|--[js folder]
   |-- config.js
   |-- fetchAPI.js
   |-- script.js
   |-- UI.js
   |-- utils.js
|-- [css folder]
    |-- spinner.css
    |-- style.css
|-- images/
    |-- no-image.jpeg
    |-- logo.png
    |-- showcase-bg.jpeg
|-- [lib folder]
    |-- fontawesome.css
    |-- swiper.css
    |-- swiper.js
|-- [webfonts folder]
    |-- [all fontawesome fonts]
|-- index.html
|-- movie-details.html
|-- search.html
|-- shows.html
|-- tv-details.html
|-- README.md

```

### Contribution Guidelines

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make changes and ensure code quality.
4. Submit a pull request for review.

### Acknowledgements

-   [The Movie Database (TMDb)](https://www.themoviedb.org/) for providing the API.
-   [Swiper.js](https://swiperjs.com/) for providing the best swiping card library.
-   [Fontawesome icons](https://fontawesome.com/) for providing the easier access of icons.

### Future Improvements

1. Implement user authentication for submitting reviews.
2. Add a "Top Rated" section.
3. Add a "Genre" bar for best experience.
4. Enhance UI/UX for a more immersive experience.
5. Creating a Backend, so that i can hide api keys.

---

_Feel free to explore, contribute, and enjoy the world of movies with our Movie Review Website!_
