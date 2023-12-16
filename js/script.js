import { fetchAPIData, fetchSearchData } from './fetchAPI.js'
import { alertComponent, card, details, displayBackgroundImage, paginationComponent } from './UI.js'
import { initSwiper } from './utils.js'
const global = {
    currentPage: window.location.pathname,
    search: {
        term: '',
        type: '',
        page: 1,
        totalPage: 1,
        totalResults: 0
    }
}

async function nowPlaying() {
    const { results } = await fetchAPIData('movie/now_playing')
    console.log(results)
    console.log(results)
    results.forEach((current_movie) => {
        const div = document.createElement('div')
        div.classList.add('swiper-slide')
        const img_source = current_movie?.poster_path ? `https://image.tmdb.org/t/p/w500${current_movie.poster_path}` : 'images/no-image.jpg'
        div.innerHTML = `
						<a href="movie-details.html?id=${current_movie.id}">
							<img
								src="${img_source}"
								alt="${current_movie.original_title}"
							/>
						</a>
						<h4 class="swiper-rating">
							<i class="fas fa-star text-secondary"></i> ${current_movie.vote_average.toFixed(1)}/ 10
						</h4>
                    `
        document.querySelector('.swiper-wrapper').appendChild(div)

    })
    initSwiper()
}

async function searchResult(page_no) {
    const urlParams = window.location.search
    const params = new URLSearchParams(urlParams)
    const type = params.get('type')
    const query = params.get('search-term')
    global.search.type = type
    global.search.term = query
    if (query !== '' && query !== null) {
        const search_result = await fetchSearchData(type, query, page_no)
        let { page, total_pages, total_results, results } = search_result

        global.search.page = page
        global.search.totalPage = total_pages
        global.search.totalResults = total_results
        console.log(global.search)
        if (results.length === 0) {
            showAlert('result_not_found')
            return
        } else {
            displaySearchResult(results)
            document.querySelector('#search-term').value = ''
        }
    } else {
        showAlert('blank_query');

    }
}
async function displaySearchResult(results) {
    const searchResultSection = document.querySelector('#search-results')
    searchResultSection.innerHTML = ''
    document.querySelector('#pagination').innerHTML = ''
    if (results.length === 0) {
        showAlert('result_not_found')
        return
    } else {
        showAlert('success')
        const searchResultHeading = document.querySelector('#search-results-heading')
        searchResultHeading.innerHTML = `
        ${results.length} of ${global.search.totalResults} Results for "${global.search.term}"
        `
        const pagination = paginationComponent(global.search.page, global.search.totalPage)
        document.querySelector('#pagination').appendChild(pagination)
        results.forEach((item) => {
            const itemCard = card(global.search.type, item)
            searchResultSection.appendChild(itemCard)
        })
        setPagination()
    }
}

async function displayPopularMovies() {
    const { results } = await fetchAPIData('movie/popular')
    results.forEach((movie) => {
        const MOVIES_CARD = card('movie', movie)
        document.querySelector('#popular-movies').appendChild(MOVIES_CARD)
    })
}
async function displayPopularTvShows() {
    const { results } = await fetchAPIData('tv/popular')
    console.log(results)
    results.forEach((tv_show) => {
        const SHOWS_CARD = card('tv', tv_show)
        document.querySelector('#popular-shows').appendChild(SHOWS_CARD)
    })
}

async function displayMovieDetails() {
    const movieId = window.location.search.substring().split('=')[1]
    const movie = await fetchAPIData(`movie/${movieId} `)
    const DETAILS_SECTION = details('movie', movie)

    document.querySelector('#movie-details').innerHTML = DETAILS_SECTION
    displayBackgroundImage('#movie-details', movie.backdrop_path)
}
async function displayShowDetails() {
    const showId = window.location.search.substring().split('=')[1]
    const show = await fetchAPIData(`tv/${showId} `)
    const DETAILS_SECTION = details('tv', show)
    console.log(show)
    document.querySelector('#show-details').innerHTML = DETAILS_SECTION
    displayBackgroundImage('#show-details', show.backdrop_path)
}


function setPagination() {
    const prevBtn = document.querySelector('#prev')
    const nextBtn = document.querySelector('#next')
    if (global.search.page === 1) prevBtn.setAttribute('disabled', true)
    if (global.search.page === global.search.totalPage) nextBtn.setAttribute('disabled', true)
    if (global.search.totalPage > 1) {
        prevBtn.addEventListener('click', () => {
            global.search.page--;
            searchResult(global.search.page)
        })
        nextBtn.addEventListener('click', () => {
            global.search.page++
            searchResult(global.search.page)
        })
    }
}

function activeLink() {
    const navLinks = document.querySelectorAll('.nav-link')
    navLinks.forEach((link) => {
        if (link.getAttribute('href') === global.currentPage) {
            link.classList.add('active')
            if (global.currentPage === '/index.html') {
                link.classList.add('active')
            }
        }

    })


}
function showAlert(status) {
    const alert = document.querySelector('#alert')
    alert.innerHTML = ''
    let div;
    const success_info = {
        icon_type: 'fa-solid fa-circle-check',
        title: 'Loaded Successfully!',
        body: 'Your search results are ready.'
    }
    const error_info = {
        icon_type: 'fa-solid fa-circle-xmark',
        title: 'Something Went Wrong!',
        body: 'Please Check your network.'
    }
    const no_result_found = {
        icon_type: 'fa-solid fa-info-circle',
        title: 'No Results Found!',
        body: 'Sorry, we couldn\'t find any movies matching your search.'
    }
    const no_query = {
        icon_type: 'fa-solid fa-triangle-exclamation',
        title: 'Blank Query!',
        body: 'Please enter a movie name to search.'
    };
    if (status === 'success') {
        div = alertComponent('alert-success', success_info)
    } else if (status === 'error') {
        div = alertComponent('alert-error', error_info)
    }
    else if (status === 'result_not_found') {
        div = alertComponent('alert-error', no_result_found)

    } else if (status === 'blank_query') {
        div = alertComponent('alert-error', no_query)
    }
    if (div) {
        alert.appendChild(div)
        alert.style.display = 'flex'
    }

    console.log(alert)
    setTimeout(() => {
        alert.style.display = 'none'
        alert.innerHTML = ''
    }, 5000)
}

// init app
function init() {
    showAlert()
    switch (global.currentPage) {
        case '/':
        case '/index.html':
            displayPopularMovies()
            nowPlaying()
            break;
        case '/shows.html':
            displayPopularTvShows()
            break;
        case '/tv-details.html':
            console.log('Tv Details')
            displayShowDetails()
            break;
        case '/movie-details.html':
            displayMovieDetails()
            break;
        case '/search.html':
            searchResult(global.search.page)
            console.log('search pages')
            break;
        default:
            break;
    }
    activeLink()
}

document.addEventListener('DOMContentLoaded', init)