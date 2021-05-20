import { Map, View } from 'ol';
import GeoJSON from 'ol/format/GeoJSON';
import HeatmapLayer from 'ol/layer/Heatmap';
import TileLayer from 'ol/layer/Tile';
// import VectorLayer from 'ol/layer/Vector';
import { bbox as bboxStrategy } from 'ol/loadingstrategy';
import 'ol/ol.css';
import OSM from 'ol/source/OSM';
import VectorSource from 'ol/source/Vector';

// create traffic accidents vector source that consumes WFS features
const trafficAccidentsSource = new VectorSource({
  format: new GeoJSON(),
  url: (extent) => {
    return (
      'https://geo.stat.fi/geoserver/tieliikenne/wfs?service=WFS&' +
      'version=1.1.0&request=GetFeature&typename=tieliikenne:tieliikenne_2019&' +
      'outputFormat=application/json&srsname=EPSG:3857&' +
      'bbox=' +
      extent.join(',') +
      ',EPSG:3857'
    );
  },
  strategy: bboxStrategy,
  attributions: 'Road traffic accidents data by <a href="https://www.stat.fi/">Statistics Finland</a> (CC BY 4.0)',
});

// create traffic accidents vector layer
// const trafficAccidentsLayer = new VectorLayer({
//   source: trafficAccidentsSource,
// });

// create traffic accidents heatmap layer
const trafficAccidentsHeatmapLayer = new HeatmapLayer({
  source: trafficAccidentsSource,
  blur: 12,
  radius: 8,
});

// create OpenStreetMap layer
const osmLayer = new TileLayer({
  source: new OSM(),
});

// create map
const map = new Map({
  target: 'map',
  layers: [osmLayer, trafficAccidentsHeatmapLayer],
  view: new View({
    center: [2975296.098311, 9588260.828093],
    zoom: 5,
  }),
});
