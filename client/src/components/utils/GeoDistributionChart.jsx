import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import cityCoordinates from "../../constants/coordinates";

const GeoDistributionChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/geographical-distribution`
        );
        const result = await response.json();
        setData(result["Geographical Distribution by City"]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <MapContainer
      center={[37.0902, -95.7129]}
      zoom={4}
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      {data.map((cityData, index) => {
        const coordinates = cityCoordinates[cityData._id];
        if (!coordinates) return null;
        return (
          <CircleMarker
            key={index}
            center={coordinates}
            radius={Math.sqrt(cityData.customerCount) * 2}
            fillOpacity={0.5}
            color="blue"
          >
            <Popup>
              {cityData._id}: {cityData.customerCount} customers
            </Popup>
          </CircleMarker>
        );
      })}
    </MapContainer>
  );
};

export default GeoDistributionChart;
