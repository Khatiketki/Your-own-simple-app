document.getElementById("zipForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form submission

    const zipCode = document.getElementById("zipcode").value;
    const locationInfo = document.getElementById("location-info");

    // Clear previous results
    locationInfo.innerHTML = '';

    if (zipCode.length === 5 && !isNaN(zipCode)) {
        fetch(`https://api.zippopotam.us/us/${zipCode}`)
            .then(response => {
                if (!response.ok) throw new Error("Zip code not found");
                return response.json();
            })
            .then(data => {
                const { "place name": place, state, "state abbreviation": stateAbbr } = data.places[0];
                locationInfo.innerHTML = `
                    <p><strong>City:</strong> ${place}</p>
                    <p><strong>State:</strong> ${state} (${stateAbbr})</p>
                `;
            })
            .catch(error => {
                locationInfo.innerHTML = `<p style="color: red;">${error.message}</p>`;
            });
    } else {
        locationInfo.innerHTML = `<p style="color: red;">Please enter a valid 5-digit zip code.</p>`;
    }
});
