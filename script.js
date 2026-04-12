const input = document.querySelector("input");
const arrow = document.querySelector("arrow");
const list = document.querySelectorAll("info");

let marker = null; // IMPORTANT

// Default map (Delhi)
const map = L.map('map').setView([28.644800, 77.216721], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
   attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Default marker
marker = L.marker([28.644800, 77.216721]).addTo(map);

function sendRequest() {
    let inputValue = input.value;

    // agar user kuch na dale to default IP use ho
    let ip = inputValue || "8.8.8.8";

    fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_zL8x2lD0EwuysaAW3w1jSMm3m0e4L&ipAddress=${ip}`)
    .then((response) => response.json())
    .then((responseData) => {
        //console.log(responseData);
        if (responseData.code === 422) {
            alert("Invalid IP Address");
            return;
        }

          //  UI update
        list[0].innerHTML = responseData.ip;
        list[1].innerHTML =
            responseData.location.city + ", " +
            responseData.location.region + " " +
            responseData.location.country;

        list[2].innerHTML = "UTC " + responseData.location.timezone;
        list[3].innerHTML = responseData.isp;

        //Map update
        const lat = responseData.location.lat;
        const lng = responseData.location.lng;

        map.setView([lat, lng], 13);

        // remove old marker
        if (marker !== null) {
            map.removeLayer(marker);
        }

        // add new marker
        marker = L.marker([lat, lng]).addTo(map)
            .bindPopup(responseData.ip)
            .openPopup();
    })
    .catch((error) => {
        console.error("Error:", error);
    });
}


// Click event
//arrow.addEventListener("click", sendRequest);

// Enter key event
// document.addEventListener("keypress", (e) => {
//     if (e.key === "Enter") {
//         sendRequest();
//     }
// });