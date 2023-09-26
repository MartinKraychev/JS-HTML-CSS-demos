function loadCommits() {
    const username = document.getElementById('username').value;
    const repo = document.getElementById('repo').value;
    const list = document.getElementById('commits');
    makeRequest()

    async function makeRequest() {
		try {

            const response = await fetch(`https://api.github.com/repos/${username}/${repo}/commits`)
            if (response.ok === false) {
                throw new Error(`${response.status}`)
            }
            const data = await response.json()

            list.innerText = ''
            for(const el of data) {
                const li = document.createElement('li')
                li.textContent = `${el.commit.author.name}: ${el.commit.message}`
                list.appendChild(li)
            }

        }
        catch (error) {
            list.innerText = ''
            const li = document.createElement('li')
            li.textContent = `Error: ${error.message} (Not Found)`
            list.appendChild(li)

        }
    }
}