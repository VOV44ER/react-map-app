import MapComponent from "./Components/MapComponent";
import { ToastContainer, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdCard from './Components/AdCard';
import useAppSelector from "./store/hooks/useAppSelector";
import { useEffect, useState } from "react";


const App = () => {
  const { allADS } = useAppSelector((store) => store.ads);
  const [visibleADS, setVisibleADS] = useState(allADS);
  const [mapBounds, setMapBounds] = useState({
    _southWest: { lat: 50.383895818241434, lng: 30.465602874755863 },
    _northEast: { lat: 50.51615542297046, lng: 30.58130264282227 }
  });

  const handleMapMove = (newBounds) => {
    setMapBounds(newBounds);
  };

  console.log(allADS);
  console.log(visibleADS);

useEffect(() => {
  if (mapBounds) {
    const { lat: swLat, lng: swLng } = mapBounds._southWest;
    const { lat: neLat, lng: neLng } = mapBounds._northEast;

    const filteredADS = allADS.filter(({ position }) => {
      return position[0] >= swLat && position[0] <= neLat && position[1] >= swLng && position[1] <= neLng;
    });

    setVisibleADS(filteredADS);
  }
}, [allADS, mapBounds]);

  return (
    <div className="flex">
      <MapComponent
        allADS={allADS}
        center={[50.4501, 30.5234]}
        zoom={13}
        onMoveEnd={handleMapMove}
      />
      <div className="p-4 bg-blue-gray-100 overflow-auto w-[350px] h-full absolute top-0 right-0 flex flex-col gap-3">
        {visibleADS.map(({ name, image, price, description, id }) => (
          <AdCard key={id} name={name} image={image} price={price} description={description} />
        ))}
      </div>
      <ToastContainer
        bodyClassName={() => 'items-center flex font-sans text-base w-full p-2.5'}
        position="top-right"
        autoClose={2000}
        hideProgressBar
        transition={Flip}
        style={{ width: 'auto' }}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        />
    </div>
  );
};

export default App;
