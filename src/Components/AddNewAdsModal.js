import { Button, Dialog, Card, CardBody, CardFooter, Typography, Input, Textarea } from "@material-tailwind/react";
import { useState } from "react";
import { callToast } from '../helpers/callToast';
import useAppDispatch from "../store/hooks/useAppDispatch";
import { postAdData } from "../store/thunks/applicationThunks";
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  price: Yup.number()
    .typeError('Price must be a number')
    .required('Price is required')
    .positive('Price must be a positive number'),
  description: Yup.string(),
  image: Yup.mixed(),
});


const AddNewAdsModal = ({ isOpen, handleOpen, position }) => {
  const dispatch = useAppDispatch();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await validationSchema.validate({ name, price, description, image: file }, { abortEarly: false });
      
      const formData = new FormData();
      formData.append("name", name);
      formData.append("price", price);
      formData.append("description", description);
      formData.append("image", file);

      for (let i = 0; i < position.length; i++) {
        formData.append(`position[${i}]`, position[i]);
      }

      dispatch(postAdData(formData));
      callToast('success', 'Оголошення успішно додано!');
      setName("");
      setPrice("");
      setDescription("");
      setFile("");
      setErrors({});
      handleOpen();
    } catch (error) {
      if (error.name === 'ValidationError') {
        const validationErrors = {};
        error.inner.forEach(err => {
          validationErrors[err.path] = err.message;
        });
        setErrors(validationErrors);
      } else {
        callToast('error', 'Сталась помилка при додаванні оголошення!');
        console.error("Error saving data:", error);
      }
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
            {errors.name && <span className="text-red-500">{errors.name}</span>}
            <Typography className="-mb-2" variant="h6">
              Ціна (UAH)
            </Typography>
            <Input type="number" label="Price" size="lg" value={price} onChange={(e) => setPrice(e.target.value)} />
            {errors.price && <span className="text-red-500">{errors.price}</span>}
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
