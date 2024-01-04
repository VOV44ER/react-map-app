import MapComponent from './MapComponent';

const App = () => {
  return (
    <div>
      <MapComponent center={[50.4501, 30.5234]} zoom={13} />
    </div>
  );
};

export default App;
