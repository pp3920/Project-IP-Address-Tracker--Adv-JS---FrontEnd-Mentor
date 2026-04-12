const input = document.querySelector(".input");
const arrow = document.querySelector(".arrow");
const list = document.querySelectorAll(".info");

let marker = null;

const map = L.map('map').setView([28.644800, 77.216721], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
   attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

marker = L.marker([28.644800, 77.216721]).addTo(map);

function sendRequest() {
    let inputValue = input.value;
    let ip = inputValue || "8.8.8.8";

    fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_zL8x2lD0EwuysaAW3w1jSMm3m0e4L&ipAddress=${ip}`)
    .then(res => res.json())
    .then(data => {

        console.log(data);
        if (data.code === 422) {
            alert("Invalid IP Address");
            return;
        }

        list[0].innerHTML = data.ip;
        list[1].innerHTML = `${data.location.city}, ${data.location.region} ${data.location.country}`;
        list[2].innerHTML = "UTC " + data.location.timezone;
        list[3].innerHTML = data.isp;

        const { lat, lng } = data.location;

        map.setView([lat, lng], 13);

        if (marker) map.removeLayer(marker);

        marker = L.marker([lat, lng]).addTo(map)
            .bindPopup(data.ip)
            .openPopup();
    })
    .catch(err => console.error(err));
}

arrow.addEventListener("click", sendRequest);