import { useState } from 'react';
import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet';
import AddAdvPopUp from './AddAdvPopUp';

const MapEvents = ({ setNewMarker }) => {
    useMapEvents({
        click(e) {
          setNewMarker([e.latlng.lat, e.latlng.lng]);
        },
      });
      return false;
}

const MapComponent = ({ center, zoom }) => {
    const [newMarker, setNewMarker] = useState(null);

  return (
    <MapContainer center={center} zoom={zoom} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
        {newMarker && <AddAdvPopUp position={newMarker} />}
        <MapEvents setNewMarker={setNewMarker} />
    </MapContainer>
  );
};

export default MapComponent;
