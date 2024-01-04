import { MapContainer, TileLayer } from 'react-leaflet';

const MapComponent = ({ center, zoom }) => {
  return (
    <MapContainer center={center} zoom={zoom} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {/* {markers.map((marker, index) => (
        <Marker key={index} position={marker.position} onClick={() => onMarkerClick(index)}>
          <Popup>{marker.popupContent}</Popup>
        </Marker>
      ))} */}
    </MapContainer>
  );
};

export default MapComponent;
