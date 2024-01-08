import { useEffect, useState } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import { render } from "react-dom";
import AddNewAdsModal from "./AddNewAdsModal";
import { Button } from "@material-tailwind/react";

const AddAdvPopUp = ({ position, title }) => {
  const [open, setOpen] = useState(false);
 
  const handleOpen = () => setOpen(!open);

  const map = useMap();

    useEffect(() => {
      const buttonClickHandler = () => {
        handleOpen();
      };
  
      const containerDiv = document.createElement("div");
      containerDiv.id = "popup-container";
  
      render(
        <div>
          <Button className="w-[80px] h-[35px] flex justify-center items-center" variant="outlined" onClick={buttonClickHandler}>Створити</Button>
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

    useEffect(() => {
      if (open) {
        map.closePopup();
      }
    }, [map, open]);
  
    return <AddNewAdsModal isOpen={open} handleOpen={handleOpen} position={position} />;
};

export default AddAdvPopUp;
