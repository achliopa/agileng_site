var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 40.59, lng: 23.1},
    zoom: 12
  });
}

var waypoint = new Waypoint({
  element: document.querySelector('.js--section-services'),
  handler: function(direction) {
    if (direction === 'down') {
      document.querySelector('nav').classList.add('sticky');
    } else {
      document.querySelector('nav').classList.remove('sticky');
    }
  },
  offset: 60 
})

document.querySelector('.js--scroll-to-join').onclick = function(event) {
  document.querySelector('.section-form').scrollIntoView(true);
}

// document.querySelector('.js--scroll-to-project')
// document.querySelector('.js--scroll-to-services')
// document.querySelector('.js--scroll-to-contact')

// AIzaSyD19bKfrPlfqkMEIZClW2dWf0IMChyOOS4