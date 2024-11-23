import React, { useState } from "react";
import { MapContainer, TileLayer, GeoJSON, FeatureGroup } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import axios from "axios";

const App = () => {
  const [interSectedTiles, setInterSectedTiles] = useState([]);

  // const onCreated = (e) => {
  //   const layer = e.layer;
  //   const geoJson = layer.toGeoJSON();
  //   console.log("geoJsondata",geoJsonData.features.length);
  //   const coordinates = geoJson.geometry.coordinates[0];
  //   const polygon = `POLYGON((${coordinates
  //     .map((c) => c.join(" "))
  //     .join(", ")}))`;

  //   axios
  //     .post("http://localhost:5000/api/tiles/intersect", { polygon })
  //     .then((response) => setTiles(response.data))
  //     .catch((error) => console.error(error));
  // };

  const onCreated = (e) => {
    const layer = e.layer;
    const geoJson = layer.toGeoJSON();
    const coordinates = geoJson.geometry.coordinates[0];
    const aoi = {
      aoi: {
        type: "Polygon",
        coordinates: [coordinates],
      },
    };
    axios
      .post("http://localhost:5000/api/tiles/intersect", aoi)
      .then((response) => setInterSectedTiles(response.data))
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <h1>Draw an AOI and See Intersecting Tiles</h1>
      <MapContainer
        center={[0, 0]}
        zoom={2}
        style={{ height: "500px", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        <GeoJSON data={interSectedTiles} style={{ color: "red", weight: 2 }} />

        <FeatureGroup>
          <EditControl
            position="topright"
            onCreated={onCreated}
            draw={{
              rectangle: false,
              circle: false,
              marker: false,
              circlemarker: false,
            }}
          />
        </FeatureGroup>
      </MapContainer>
    </div>
  );
};

export default App;
