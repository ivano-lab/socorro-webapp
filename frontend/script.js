function collectLocation() {
  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          
          localStorage.setItem('latitude', latitude);
          localStorage.setItem('longitude', longitude);
          
          window.location.href = 'pedido.html';
      }, function(error) {
          console.error('Error getting location: ', error);
      });
  } else {
      console.error('Geolocation is not supported by this browser.');
  }
}

function openLocationApp(latitude, longitude) {
  const appUrl = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
  window.open(appUrl, '_blank');
}

function listRescues() {
  fetch('http://localhost:3000/rescues')
      .then(response => response.json())
      .then(data => {
          const tableBody = document.getElementById('rescues-body');
          tableBody.innerHTML = ''; 

          data.forEach(rescue => {
              const row = document.createElement('tr');

              const cellLatitude = document.createElement('td');
              cellLatitude.textContent = rescue.latitude;
              row.appendChild(cellLatitude);

              const cellLongitude = document.createElement('td');
              cellLongitude.textContent = rescue.longitude;
              row.appendChild(cellLongitude);

              const cellAction = document.createElement('td');
              const button = document.createElement('button');
              button.textContent = 'Socorrer';
              button.classList.add('location-button');
              button.onclick = () => openLocationApp(rescue.latitude, rescue.longitude);
              cellAction.appendChild(button);
              row.appendChild(cellAction);
              tableBody.appendChild(row);
          });

          document.getElementById('rescues-table').style.display = 'block';

          document.querySelector('.impact-image').style.display = 'none';

      })
      .catch(error => {
          console.error('Erro ao buscar dados: ', error);
      });
}


