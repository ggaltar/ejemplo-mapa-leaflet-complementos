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

  // Capas base agregadas mediante L.tileLayer y leaflet-providers
  "Stamen.Watercolor": L.tileLayer.provider('Stamen.Watercolor'),
  "Esri.WorldShadedRelief": L.tileLayer.provider('Esri.WorldShadedRelief'),
  "Esri.WorldStreetMap": L.tileLayer.provider('Esri.WorldStreetMap')
}

// Se agregan todas las capas base al mapa
control_capas = L.control.layers(capas_base).addTo(mapa);

// Se activa una capa base del control
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

// Agregar capas WMS
var capa_distritos = L.tileLayer.wms('https://geos.snitcr.go.cr/be/IGN_5/wms?', {
	  layers: 'limitedistrital_5k',
	  format: 'image/png',
	  transparent: true
}).addTo(mapa);

var capa_deslizamientos = L.tileLayer.wms('http://mapas.cne.go.cr/servicios/cne/wms', {
	  layers: 'deslizamientos',
	  format: 'image/png',
	  transparent: true
}).addTo(mapa);

var mundialis = L.tileLayer.wms('http://ows.mundialis.de/services/service?', {
	  layers: 'SRTM30-Colored',
	  format: 'image/png',
	  transparent: true
}).addTo(mapa);

// Se agregan al control de capas como de tipo "overlay"
control_capas.addOverlay(capa_distritos, 'Distritos');
control_capas.addOverlay(capa_deslizamientos, 'Deslizamientos');
control_capas.addOverlay(mundialis, 'Mundialis');