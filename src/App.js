import MapComponent from "./Components/MapComponent";
import { ToastContainer, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const App = () => {
  return (
    <div>
      <MapComponent center={[50.4501, 30.5234]} zoom={13} />
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
