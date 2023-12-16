import { API_HASH } from './config.js'
const API_URL = 'https://api.themoviedb.org/3'

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_HASH}`
    }
};
//Fetch Data from api
export async function fetchAPIData(endpoint) {
    isLoading(true)
    try {
        const response = await fetch(`${API_URL}/${endpoint}?language=en-US`, options)
        const data = await response.json()
        return data
    } catch (error) {
        return ('Error While Fetching Data' + error)
    } finally {
        isLoading(false)

    }
}
function isLoading(state) {
    const spinner = document.querySelector('.spinner')
    state ? spinner.classList.add('show') : spinner.classList.remove('show')
}

export async function fetchSearchData(type, query, page) {
    isLoading(true)
    try {
        const response = await fetch(`${API_URL}/search/${type}?query=${query}&page=${page || 1}&language=en-US`, options)
        const data = await response.json()
        return data
    } catch (error) {
        return ('Error While Fetching Data' + error)
    } finally {
        isLoading(false)
    }
}