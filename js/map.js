let myMap = L.map('map').setView([47.2186371, -1.5541362], 12);
let markerClusters = L.markerClusterGroup();

/* Affichage de la carte */

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  minZoom: 2,
  maxZoom: 20
}).addTo(myMap);


/* Appelle de l'api JCDecaux */
ajaxGet("https://api.jcdecaux.com/vls/v1/stations?contract=Nantes&apiKey=49decfbc8866823cb4bfac018d5f24967fc28def", function(reponse){
  let datas = JSON.parse(reponse);

 datas.forEach(function(data){

  let markers = [];
  let posStation = data.position;
  let marker = L.marker(posStation);

  markerClusters.addLayer(marker);

  marker.addEventListener("click", function(){
    $("#clickStation").attr('hidden', 'true');

    if(data.available_bikes > 0){
      $("#reserve").removeAttr('disabled');
      $("#error").attr('hidden', 'true');
    }else{
      $("#error").removeAttr('hidden');
      $("#reserve").attr('disabled', 'true');
    }

      $("#stationName").html(data.name);
      $("#stationAddress").html(data.address);
      $("#stationStatus").html(data.status);
      $("#availableBikes").html(data.available_bikes);
      $("#availableBikesStands").html(data.available_bike_stands);
    });

    markers.push(marker);
  });

  myMap.addLayer(markerClusters);
 });
