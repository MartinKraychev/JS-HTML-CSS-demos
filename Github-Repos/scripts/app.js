function loadRepos() {
	const input = document.getElementById('username').value
	const repos = document.getElementById('repos')
	makeRequest()

	async function makeRequest() {
		try {

			const response = await fetch(`https://api.github.com/users/${input}/repos`)
			if (response.ok === false) {
				throw new Error(`${response.status} ${response.statusText}`)
			}
			const data = await response.json()

			repos.innerHTML = ''
			for (const repo of data) {
				const li = document.createElement('li')
				li.innerHTML = `<a href=${repo.html_url}>
                	${repo.full_name}
            	</a>`
				repos.appendChild(li)

			}
		}

		catch (error) {
			repos.innerHTML = ''
			const li = document.createElement('li')
			li.textContent = error.message
			repos.appendChild(li)
		}
	}

}