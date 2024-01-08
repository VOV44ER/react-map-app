import { useState, useEffect } from 'react';
import { MapContainer, Marker, TileLayer, useMapEvents } from 'react-leaflet';
import AddAdvPopUp from './AddAdvPopUp';
import useAppDispatch from '../store/hooks/useAppDispatch';
import { getAdsData } from '../store/thunks/applicationThunks';

const MapEvents = ({ setNewMarker, onMoveEnd, onMarkerClick }) => {
  const map = useMapEvents({
    click(e) {
      if (!e.originalEvent.target.classList.contains('leaflet-marker-icon')) {
        setNewMarker([e.latlng.lat, e.latlng.lng]);
      } else {
        const markerId = e.originalEvent.target.options.id;
        if (onMarkerClick) {
          onMarkerClick(markerId);
        }
      }
    },
    moveend() {
      if (onMoveEnd) {
        onMoveEnd(map.getBounds());
      }
    },
  });
  return null;
};

const MapComponent = ({ center, zoom, allADS, onMoveEnd, onMarkerClick }) => {
  const dispatch = useAppDispatch();
  const [newMarker, setNewMarker] = useState(null);

  useEffect(() => {
    dispatch(getAdsData());
  }, []);

  return (
    <MapContainer center={center} zoom={zoom} style={{ height: '100vh', width: 'calc(100% - 350px)' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {allADS.map(ad => (
        <Marker
          key={ad.id}
          position={ad.position}
          eventHandlers={{
            click: () => onMarkerClick(ad.id),
          }}
        >
          {/* Additional marker content here */}
        </Marker>
      ))}
      {newMarker && <AddAdvPopUp position={newMarker} />}
      <MapEvents
        setNewMarker={setNewMarker}
        onMoveEnd={onMoveEnd}
        onMarkerClick={onMarkerClick}
      />
    </MapContainer>
  );
};

export default MapComponent;
