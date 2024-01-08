import { useState, useEffect } from 'react';
import { MapContainer, Marker, TileLayer, useMapEvents } from 'react-leaflet';
import AddAdvPopUp from './AddAdvPopUp';
import useAppDispatch from '../store/hooks/useAppDispatch';
import useAppSelector from '../store/hooks/useAppSelector';
import { getAdsData } from '../store/thunks/applicationThunks';

const MapEvents = ({ setNewMarker }) => {
  useMapEvents({
    click(e) {
      setNewMarker([e.latlng.lat, e.latlng.lng]);
    },
  });
  return false;
}

const MapComponent = ({ center, zoom }) => {
  const dispatch = useAppDispatch();
  const { allADS } = useAppSelector(store => store.ads);
  const [newMarker, setNewMarker] = useState(null);

  useEffect(() => {
    dispatch(getAdsData());
  }, []);

  return (
    <MapContainer center={center} zoom={zoom} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {allADS.map(ad => (
        <Marker key={ad.id} position={ad.position}>
          {/* Additional marker content here */}
        </Marker>
      ))}
      {newMarker && <AddAdvPopUp position={newMarker} />}
      <MapEvents setNewMarker={setNewMarker} />
    </MapContainer>
  );
};

export default MapComponent;
