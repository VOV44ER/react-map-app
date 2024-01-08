import MapComponent from "./Components/MapComponent";
import { ToastContainer, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdCard from './Components/AdCard';
import useAppSelector from "./store/hooks/useAppSelector";


const App = () => {
  const { allADS } = useAppSelector(store => store.ads);
  return (
    <div className="flex">
      <MapComponent allADS={allADS} center={[50.4501, 30.5234]} zoom={13} />
      <div className="p-4 bg-blue-gray-100 overflow-auto w-[350px] h-full absolute top-0 right-0 flex flex-col gap-3">
        {allADS.map(({ name, image, price, description, id }) => (
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
