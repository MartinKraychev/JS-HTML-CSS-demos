async function getInfo() {
    const inputField = document.getElementById('stopId').value;
    const url = `http://localhost:3030/jsonstore/bus/businfo/${inputField}`;
    const stopName = document.getElementById('stopName');
    const buses = document.getElementById('buses')
    stopName.textContent = 'Loading...'

    try {
        const res = await fetch(url);
        if (res.status !== 200) {
            throw new Error()
        }

        buses.replaceChildren()
        const data = await res.json();

        stopName.textContent = data.name
        Object.entries(data.buses).forEach(b => {
            const liElement = document.createElement('li')
            liElement.textContent = `Bus ${b[0]} arrives in ${b[1]} minutes`
            buses.appendChild(liElement)
        })

    } catch (err) {
        stopName.textContent = 'Error'
        buses.replaceChildren()
    }

}