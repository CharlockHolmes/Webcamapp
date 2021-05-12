function setup() {
    const btn = document.getElementById('getbtn');

    btn.addEventListener('click', async event => {
        const response = await fetch('/api');
        const data = await response.json();
        console.log(data);
        for (item of data) {
            const root = document.createElement('p');
            const date = document.createElement('div');
            const geo = document.createElement('div');
            const name = document.createElement('div');

            name.textContent = `Name: ${item.data.name}`;

            geo.textContent =
                `Lat: ${item.data.latitude.toFixed(2)}° Lon: ${item.data.longitude.toFixed(2)}°`;

            const dateString = new Date(item.timestamp).toLocaleString();
            date.textContent = `time : ${dateString}`;

            root.append(name, date, geo);
            document.body.append(root);
            // root.parentElement = document.getElementById('body');
            // mood.parentElement = document.getElementById('body');

        }
    });
    noCanvas();
    const video = createCapture(VIDEO);
}