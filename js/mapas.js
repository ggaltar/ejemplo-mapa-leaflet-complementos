// Mapa Leaflet
var mapa = L.map('mapid').setView([9.8, -84.25], 7);

// Definición de capas base
var capas_base = {
	
  // Capa base agregada mediante L.tileLayer
  "OSM": L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?', 
    {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }
  ),

  // Capa base agregada mediante L.tileLayer y leaflet-providers
  "Stamen.Watercolor": L.tileLayer.provider('Stamen.Watercolor')	
}

// Se agregan todas las capas base al mapa
control_capas = L.control.layers(capas_base).addTo(mapa);

// Se selecciona una capa del control
capas_base['OSM'].addTo(mapa);	

// Control de escala
L.control.scale().addTo(mapa);

// Capa vectorial de ASP en formato GeoJSON
$.getJSON("https://tpb729-desarrollosigweb-2021.github.io/datos/sinac/areas_protegidas-wgs84.geojson", function(geodata) {
  var capa_asp = L.geoJson(geodata, {
    style: function(feature) {
	  return {'color': "#013220", 'weight': 3, 'fillOpacity': 0.0}
    },
    onEachFeature: function(feature, layer) {
      var popupText = "<strong>Área protegida</strong>: " + feature.properties.nombre_asp + "<br>" + "<strong>Categoría</strong>: " + feature.properties.cat_manejo;
      layer.bindPopup(popupText);
    }			
  }).addTo(mapa);

  control_capas.addOverlay(capa_asp, 'Áreas protegidas');
});		
