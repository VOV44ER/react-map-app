import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
} from "@material-tailwind/react";
   
const AdCard = ({ image, name, price, description, isSelected, id, handleMarkerClick }) => {
    return (
      <Card className={`w-[320px] ${isSelected ? 'bg-[#82d173]' : ''}`}>
        <CardHeader shadow={false} floated={false} className="h-[200px]">
          <img
              src={`data:image/png;base64,${image}`}
            alt="cardAd"
            className="h-full w-full object-cover"
          />
        </CardHeader>
        <CardBody>
          <div className="mb-2 flex items-center justify-between">
            <Typography color="blue-gray" className="font-medium">
              {name}
            </Typography>
            <Typography color="blue-gray" className="font-medium">
              {price} uah
            </Typography>
          </div>
          <Typography
            variant="small"
            color="gray"
            className="font-normal opacity-75"
          >
            {description}
          </Typography>
        </CardBody>
        <CardFooter className="pt-0">
          <Button
            onClick={() => handleMarkerClick(id)}
            ripple={false}
            fullWidth={true}
            className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
          >
            Показати на мапі
          </Button>
        </CardFooter>
      </Card>
    );
  }

  export default AdCard;