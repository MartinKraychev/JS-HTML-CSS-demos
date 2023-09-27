window.addEventListener('DOMContentLoaded', start)


async function start() {

		try {

            const response = await fetch(`http://localhost:3030/jsonstore/cookbook/recipes`)
            if (response.ok === false) {
                throw new Error(`${response.status}`)
            }
            const data = await response.json()
            const main = document.getElementsByTagName('main')[0]
            main.replaceChildren()


            for (let item in data) {
                const article = document.createElement('article')

                article.innerHTML = `<div class="title">
                <h2>${data[item].name}</h2>
            </div>
            <div class="small">
                <img src=${data[item].img}>
            </div>`
                article.className = 'preview'
                article.addEventListener('click', getinfo.bind(null, data[item]._id, article))

                main.appendChild(article)
            }
        }

        catch (error) {
        }
    }

    async function getinfo(id, element) {
        try {

            const response = await fetch(`http://localhost:3030/jsonstore/cookbook/details/${id}`)
            if (response.ok === false) {
                throw new Error(`${response.status}`)
            }
            const data = await response.json()


            const ulElement = document.createElement('ul')
            data.ingredients.forEach(i => {
                const liElement = document.createElement('li')
                liElement.textContent = i
                ulElement.appendChild(liElement)
            })

            const divDescription = document.createElement('div')
            divDescription.className = 'description'
            const h3 = document.createElement('h3')
            h3.textContent = 'Preparation:'
            divDescription.appendChild(h3)
            data.steps.forEach(step => {
                const p = document.createElement('p')
                p.textContent = step
                divDescription.appendChild(p)

            })


            const article = create('article', {},
                create('h2', {}, 'Title'),
                create('div', {className:'band'},
                    create('div', {className:'thumb'},
                        create('img', {src:data.img})
                        ),
                    create('div', {className:'ingredients'},
                    create('h3', {}, 'Ingredients:'),
                    ulElement
                    )
                    ),
                divDescription
                )
            element.replaceWith(article)
        }
        catch (err) {

        }

    }

    function create(type, attr, ...content) {
        const element = document.createElement(type);

        for (let prop in attr) {
            element[prop] = attr[prop];
        }
        for (let item of content) {
            if (typeof item === 'string' || typeof item === 'number') {
                item = document.createTextNode(item);
            }
            element.appendChild(item);
        }
        return element
    }

