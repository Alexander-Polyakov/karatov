var map;
var InfoBubbles = {};

function initLandMap() {
    map = new google.maps.Map(document.getElementById('land1-map'), {
        center: {lat: 55.750701, lng: 37.617047},
        scrollwheel: false,
        draggable: false,
        zoom: 7
    });


    map.data.loadGeoJson('js/geodata/kk.json');
    map.data.loadGeoJson('js/geodata/kk_dist.json');
    map.data.loadGeoJson('js/geodata/ra.json');
    map.data.loadGeoJson('js/geodata/ra_dist.json');
    map.data.loadGeoJson('js/geodata/sk.json');
    map.data.loadGeoJson('js/geodata/sk_dist.json');
    map.data.loadGeoJson('js/geodata/trinity.json');
    map.data.loadGeoJson('js/geodata/moscow.json');


    map.data.setStyle(function (feature) {


        return {
            fillColor: 'red',
            fillOpacity: 0.3,
            strokeColor: 'OliveDrab',
            strokeWeight: 2,
            visible: visible
        };

    });


    map.data.addListener('click', function (event) {
        if (!event.feature.getProperty('isDistrikt')) {
            showDistrict(event.feature.getProperty('ID'));
        } else {
            showPopup(event.feature.getProperty('ID'));
        }

    });
}
