"use strict"
var map;
var start = null;
var to_visit = [];

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: mid,
        zoom: 14
    });

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            start = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            var startMarker = new google.maps.Marker({
                position: start,
                map: map,
                icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
                title: 'Current Location'
            });
        }, function() {
            console.log('Geolocation service failed');
            var startMarker = new google.maps.Marker({
                position: {lat: 33.7773455, lng: -84.4051292},
                map: map,
                icon: 'http://maps.google.com/mapfiles/ms/micons/green-dot.png',
                title: 'Current Location',
            });
        });
    } else {
        console.log('Browser doesnt support geolocation:(');
    }
    filterNeeded().then(need_pickup => Object.keys(need_pickup)).then(generateLocs);
    getDatabase().on('child_changed', data => {
        if (data.val() === 'Needed') {
            generateLocs([data.key]);
        }
    })
}

function getDatabase() {
    return firebase.database().ref('/fraternities/')
}

function filterNeeded() {
    return getDatabase().orderByValue().equalTo('Needed').once('value').then(response => response.val());
}

function makeRoute() {
    var toDir = "https://www.google.com/maps/dir/?api=1&origin=";
    toDir = toDir + start['lat'] + ', ' + start['lng'];
    toDir = toDir + "&waypoints=";
    var i = 0;
    while (i < to_visit.length - 1) {
        toDir = toDir + to_visit[i][1] + ', ' + to_visit[i][2] + "|";
        i++;
    }
    toDir = toDir + to_visit[i][1] + ', ' + to_visit[i][2] + "&travelmode=driving";
    toDir = toDir + "&destination=" + mission['lat'] + ', ' + mission['lng'];
    toDir = encodeURI(toDir);

    window.open(toDir, '_blank');
}

function generateLocs(need_pickup) {
    houses.filter(x => need_pickup.includes(x[0])).forEach(house => {
        to_visit.push(house);
        var marker = new google.maps.Marker({
            position: {lat: house[1], lng: house[2]},
            map: map,
            title: house[0]
        });
    });
}

