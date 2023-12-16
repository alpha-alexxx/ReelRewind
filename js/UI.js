const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

export function card(type, data) {
	const cardDiv = document.createElement('div')
	cardDiv.classList.add('card')
	const img_source = data?.poster_path ? `https://image.tmdb.org/t/p/w500${data.poster_path}` : 'images/no-image.jpg'
	const date = `${data.release_date ? `Release: ${data.release_date ? new Date(data.release_date).toLocaleDateString('en-IN', options) : "Not Declared"}` : `First Air Date: ${data.first_air_date ? new Date(data.first_air_date).toLocaleDateString('en-IN', options) : "Not Declared"}`}`
	cardDiv.innerHTML = `
                <div class="card">
					<a href="${type}-details.html?id=${data.id}">
						<img
							src="${img_source}"
							class="card-img-top"
							alt="${data.original_title || data.original_name}"
						/>
					</a>
					<div class="card-body">
						<h5 class="card-title">${data.title || data.name}</h5>
						<p class="card-text">
							<small class="text-muted">
                            ${date}
							</small>
						</p>
					</div>
				</div>
    `
	return cardDiv
}


export const details = (type, data) => {

	const img_source = data?.poster_path ? `https://image.tmdb.org/t/p/w500${data.poster_path}` : 'images/no-image.jpg'
	const date = `${data.release_date ? `Release: ${data.release_date ? new Date(data.release_date).toLocaleDateString('en-IN', options) : "Not Declared"}` : `First Air Date: ${data.first_air_date ? new Date(data.first_air_date).toLocaleDateString('en-IN', options) : "Not Declared"}`}`
	const section = `
                
                <div class="details-top">
					<div>
						<img
							src="${img_source}"
							class="card-img-top"
							alt="${data.original_title || data.name}"
						/>
					</div>
					<div>
						<h2>${data.original_title || data.name}</h2>
						<p>
							<i class="fas fa-star text-primary"></i>
							${data.vote_average.toFixed(1)} / 10
						</p>
						<p class="text-muted">${date}</p>
						<p>
							${data.overview}
						</p>
						<h5>Genres</h5>
						<ul class="list-group">
                        ${data.genres.map((genre) => `<li>${genre.name}</li>`).join('')}
						</ul>
						${data.homepage && (`<a href="${data.homepage}" target="_blank" class="btn">Visit Movie Homepage</a>`)}
					</div>
				</div>
                ${type === 'movie' ? `<div class="details-bottom">
					<h2>Movie Info</h2>
					<ul>
						<li>
							<span class="text-secondary">Budget:</span>
							$ ${data.budget.toLocaleString('en-IN')}
						</li>
						<li>
							<span class="text-secondary">Revenue:</span>
							$ ${data.revenue.toLocaleString('en-IN')}
						</li>
						<li>
							<span class="text-secondary">Runtime:</span> ${data.runtime}
							minutes
						</li>
						<li>
							<span class="text-secondary">Status:</span> ${data.status}
						</li>
					</ul>
					<h4>Production Companies</h4>
					<div class="list-group">
						${data.production_companies.map((company) => `<span>${company.name}</span>`).join(', ')}
					</div>
				</div>`
			:
			`
                <div class="details-bottom">
                    <h2>Show Info</h2>
                    <ul>
                        <li><span class="text-secondary">Number Of Seasons: </span>${data.number_of_seasons}</li>
                        <li><span class="text-secondary">Number Of Episodes: </span>${data.number_of_episodes}</li>
                        <li><span class="text-secondary">Last Episode To Air: </span>${new Date(data.last_air_date).toLocaleDateString('en-IN', options)}</li>
                        <li><span class="text-secondary">Status: </span>${data.status}</li>
                    </ul>
                    <h4>Production Companies</h4>
                    <div class="list-group">
                        ${data.production_companies.map((company) => `<span>${company.name}</span>`).join(', ')}
                    </div>
                </div>
                `}
				
`
	return section
}

export const paginationComponent = (page, total_pages) => {
	const Pagination = document.createElement('div')
	Pagination.classList.add('pagination')

	Pagination.innerHTML = `
	<button id='prev' class='btn btn-primary prev-btn'>Prev</button>
	<p class='page-counter'>${page} of ${total_pages}</p> 
	<button id='next' class='btn btn-primary next-btn'>Next</button>
	`
	return Pagination
}

export const alertComponent = (classes, info) => {
	const div = document.createElement('div')
	div.classList.add(classes)
	div.innerHTML = `
				<i class="${info.icon_type}" style="font-size: 30px"></i>
				<div class="alert-info">
					<p class="alert-title">${info.title}</p>
					<p class="alert-body">
						${info.body}
					</p>
				</div>
	`
	return div
}
// Display Background Image
export function displayBackgroundImage(page, path) {
	const overlay = document.createElement('div')
	overlay.style.backgroundImage = `${path && `url(https://image.tmdb.org/t/p/original${path})`}`
	overlay.classList.add('backdrop-img')
	document.querySelector(page).appendChild(overlay)
	return overlay
}