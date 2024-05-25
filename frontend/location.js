window.onload = function() {
    const latitude = localStorage.getItem('latitude');
    const longitude = localStorage.getItem('longitude');
    if (latitude && longitude) {
        document.getElementById('latitude').value = latitude;
        document.getElementById('longitude').value = longitude;
    }

    document.getElementById('rescue-form').onsubmit = function(event) {
        event.preventDefault();

        const formData = {
            latitude: document.getElementById('latitude').value,
            longitude: document.getElementById('longitude').value,
            adults_count: document.getElementById('adults-count').value,
            children_count: document.getElementById('children-count').value,
            elderly_count: document.getElementById('elderly-count').value,
            animals_count: document.getElementById('animals-count').value,
            special_needs: document.getElementById('special-needs').value,
            additional_info: document.getElementById('additional-info').value,
        };

        fetch('http://localhost:3000/rescue', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
        .then(response => response.text())
        .then(data => {
            console.log('Success:', data);
            document.getElementById('rescue-form').style.display = 'none';
            document.getElementById('thank-you').style.display = 'block';
            redirectToHomePage();
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    };
}

function redirectToHomePage() {
  setTimeout(() => {
    window.location.href = 'index.html'; 
  }, 8000); 
}
