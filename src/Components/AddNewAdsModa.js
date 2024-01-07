import { Button, Dialog, Card, CardBody, CardFooter, Typography, Input, Textarea } from "@material-tailwind/react";
import { useState } from "react";

const AddNewAdsModal = ({ isOpen, handleOpen }) => {
  const [file, setFile] = useState();
  function handleChange(e) {
      setFile(URL.createObjectURL(e.target.files[0]));
  }

  return (
<Dialog
        size="xs"
        open={isOpen}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full max-w-[24rem]">
          <CardBody className="flex flex-col gap-4">
            <Typography variant="h4" color="blue-gray">
              Створити нове оголошення
            </Typography>
            <Typography className="-mb-2" variant="h6">
              Назва
            </Typography>
            <Input label="Name" size="lg" />
            <Typography className="-mb-2" variant="h6">
              Ціна
            </Typography>
            <Input label="Price" size="lg" />
            <Typography className="-mb-2" variant="h6">
              Опис
            </Typography>
            <Textarea label="Description" size="lg" />
            <h2>Додати Зображення:</h2>
            <input type="file" onChange={handleChange} />
            <img src={file} alt="logo" />
          </CardBody>
          <CardFooter className="pt-0">
            <Button variant="gradient" onClick={handleOpen} fullWidth>
              Cтворити
            </Button>
          </CardFooter>
        </Card>
      </Dialog>
  );
}

export default AddNewAdsModal;