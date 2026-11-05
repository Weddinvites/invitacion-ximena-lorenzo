let map;

async function initMap() {
    
    const myLatLng = { lat: 18.146050670832015, lng: -92.85915310090152 };
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 15,
      center: myLatLng,
    });
    
    new google.maps.Marker({
      position: myLatLng,
      map,
      title: "Salon Name...",
    });
  }

  window.initMap = initMap;