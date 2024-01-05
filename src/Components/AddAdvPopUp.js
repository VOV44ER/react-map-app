import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import { render } from "react-dom";

const AddAdvPopUp = ({ position, title }) => {
    const map = useMap();

    useEffect(() => {
      const buttonClickHandler = () => {
        console.log("Button clicked!");
      };
  
      const containerDiv = document.createElement("div");
      containerDiv.id = "popup-container";
  
      render(
        <div className="">
          <button onClick={buttonClickHandler}>Створити</button>
        </div>,
        containerDiv
      );

      const popupOptions = {
        minWidth: 80,
        maxWidth: 300,
        maxHeight: 200,
      };
  
      const popup = L.popup(popupOptions)
        .setLatLng(position)
        .setContent(containerDiv);
  
      popup.openOn(map);
  
      return () => {
        map.closePopup(popup);
        render(null, containerDiv);
      };
    }, [map, position, title]);
  
    return null;
};

export default AddAdvPopUp;
