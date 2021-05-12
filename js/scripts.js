// Mapa Leaflet
var mapa = L.map('mapid').setView([9.8, -84.25], 8);

// Definición de capas base
var capa_osm = L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?', 
  {
    maxZoom: 19,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }
).addTo(mapa);	

// Conjunto de capas base
var capas_base = {
  "OSM": capa_osm
};	    
	    
// Control de capas
control_capas = L.control.layers(capas_base).addTo(mapa);	

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


// Capa vectorial de distritos en formato GeoJSON
$.getJSON("https://tpb729-desarrollosigweb-2021.github.io/datos/ign/distritos-wgs84.geojson", function(geodata) {
  var capa_distritos = L.geoJson(geodata, {
    style: function(feature) {
	  return {'color': "#ff0000", 'weight': 3, 'fillOpacity': 0.0}
    },
    onEachFeature: function(feature, layer) {
      var popupText = "<strong>Distrito</strong>: " + feature.properties.distrito + "<br>" + "<strong>Cantón</strong>: " + feature.properties.canton + "<br>" + "<strong>Provincia</strong>: " + feature.properties.provincia;
      layer.bindPopup(popupText);
    }			
  }).addTo(mapa);

  control_capas.addOverlay(capa_distritos, 'Distritos');
});	
