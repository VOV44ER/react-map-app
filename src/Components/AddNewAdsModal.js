import { Button, Dialog, Card, CardBody, CardFooter, Typography, Input, Textarea } from "@material-tailwind/react";
import { useState } from "react";
import { callToast } from '../helpers/callToast';
import useAppDispatch from "../store/hooks/useAppDispatch";
import { postAdData } from "../store/thunks/applicationThunks";

const AddNewAdsModal = ({ isOpen, handleOpen, position }) => {
  const dispatch = useAppDispatch();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("image", file);

    for (let i = 0; i < position.length; i++) {
      formData.append(`position[${i}]`, position[i]);
    }

    try {
      dispatch(postAdData(formData));
      callToast('success', 'Оголошення успішно додано!');
      handleOpen();
    } catch (error) {
      callToast('error', 'Сталась помилка при додаванні оголошення!');
      console.error("Error saving data:", error);
    }
  };

  return (
    <Dialog size="xs" open={isOpen} handler={handleOpen} className="bg-transparent shadow-none">
      <form onSubmit={handleSubmit}>
        <Card className="mx-auto w-full max-w-[24rem]">
          <CardBody className="flex flex-col gap-4">
            <Typography variant="h4" color="blue-gray">
              Створити нове оголошення
            </Typography>
            <Typography className="-mb-2" variant="h6">
              Назва
            </Typography>
            <Input label="Name" size="lg" value={name} onChange={(e) => setName(e.target.value)} />
            <Typography className="-mb-2" variant="h6">
              Ціна
            </Typography>
            <Input label="Price" size="lg" value={price} onChange={(e) => setPrice(e.target.value)} />
            <Typography className="-mb-2" variant="h6">
              Опис
            </Typography>
            <Textarea label="Description" size="lg" value={description} onChange={(e) => setDescription(e.target.value)} />
            <h2>Додати Зображення:</h2>
            <input type="file" onChange={handleChange} />
            {file && <img src={URL.createObjectURL(file)} alt="uploaded" />}
          </CardBody>
          <CardFooter className="pt-0">
            <Button type="submit" variant="gradient" fullWidth>
              Створити
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Dialog>
  );
};

export default AddNewAdsModal;
