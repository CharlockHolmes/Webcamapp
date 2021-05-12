let status; 
let latitude;
let longitude;

function setup() {
    noCanvas();
    geoLocate();
    const video = createCapture(VIDEO);

    const btn = document.getElementById('getbtn');
    const set = document.getElementById('setbtn');
    const nameField = document.getElementById('entername');

    set.addEventListener('click', async event => {
        video.loadPixels();
        const image64 = video.canvas.toDataURL();
        const name = nameField.value;
        const time = Date.now();
        const data = {
            name,
            time,
            latitude,
            longitude,
            image64
        };
        const options = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data),

        }
        status = 'submitted';
        fetch('/api', options).then(response => {
            response.json().then(parsed => {
                console.log(parsed);
            });
        });
    });
        
    btn.addEventListener('click', async event => {
        const response = await fetch('/api');
        const data = await response.json();
        console.log(data);
        for (item of data) {
            const root = document.createElement('p');
            const date = document.createElement('div');
            const image = document.createElement('img');
            const name = document.createElement('div');
            const geo = document.createElement('div');

            image.src = item.data.image64;
            name.textContent = `Name: ${item.data.name}`;
            if(latitude != null)geo.textContent = `Lat: ${item.data.latitude.toFixed(2)}° Lon: ${item.data.longitude.toFixed(2)}°`;
            const dateString = new Date(item.data.time).toLocaleString();
            date.textContent = `time : ${dateString}`;

            root.append(name, date, geo, image);
            document.body.append(root);
            // root.parentElement = document.getElementById('body');
            // mood.parentElement = document.getElementById('body');

        }
    });
    function geoLocate(){
        function success(position) {
            latitude = position.coords.latitude;
            longitude = position.coords.longitude;
            status = 'found';
        }

        function error() {
            status = 'Unable to retrieve your location';
        }

        if (!navigator.geolocation) {
            status= 'Geolocation is not supported by your browser';
        } else {
            status = 'Locating…';
            navigator.geolocation.getCurrentPosition(success, error);
        }
    }

}