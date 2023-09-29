function solve() {
    const info = document.getElementById('info');
    let nextStopId = 'depot';
    let nextStop;
    const departBtn = document.getElementById('depart');
    const arriveBtn = document.getElementById('arrive');

    async function depart() {
        const url = `http://localhost:3030/jsonstore/bus/schedule/${nextStopId}`
        try {

            const res = await fetch(url)
            if (res.status !== 200) {
                throw new Error()
            }
            const data = await res.json()

            info.textContent = `Next stop ${data.name}`
            nextStopId = data.next
            nextStop = data.name
            departBtn.disabled = true
            arriveBtn.disabled = false

        }  catch (err) {
            info.textContent = 'Error'
            departBtn.disabled = true
            arriveBtn.disabled = true
        }
    }

    async function arrive() {
        info.textContent = `Arriving at ${nextStop}`
        departBtn.disabled = false
        arriveBtn.disabled = true
    }

    return {
        depart,
        arrive
    };
}

let result = solve();