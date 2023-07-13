import MainLayout from "../../layouts/MainLayout";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

import { Link } from "react-router-dom";

const Home = () => (
  <MainLayout>
    <div className="grid grid-cols-1 md:grid-cols-2 justify-items-center content-center gap-x-6 gap-y-6 pb-10 pt-32 min-h-screen">
      {/*Spam email detector */}
      <Card className="mt-6 w-3/4 bg-gray-900 text-white">
        <CardHeader color="blue-gray" className="relative h-56">
          <img
            src="https://tutorialsbackend.bluehost.in/wp-content/uploads/2023/04/Blog-banner-Sizes-for-Bluehost-1200-x-800-8.png"
            alt="img-blur-shadow"
            layout="fill"
          />
        </CardHeader>
        <CardBody>
          <Typography variant="h5" color="white" className="mb-2">
            SPAM Email detector
          </Typography>
          <Typography>
            This model has been designed to effectively identify and categorize
            emails into different classes, such as spam and non-spam. Using
            machine learning techniques, this classifier analyzes key features
            of the emails, such as content, sender, subject, among others, to
            determine their nature. Trust our machine learning-based classifier
            to keep your inbox organized and free from spam.
          </Typography>
        </CardBody>
        <CardFooter className="pt-0 flex justify-between">
          <Link to={"/spam-detection"}>
            <Button className="bg-white text-black">Try</Button>
          </Link>
        </CardFooter>
      </Card>

      {/*Malicius urls */}
      <Card className="mt-6 w-3/4 bg-gray-900 text-white">
        <CardHeader color="blue-gray" className="relative h-56">
          <img
            src={
              "https://miro.medium.com/v2/resize:fit:1200/1*JDWy-xAcKMnbYfS3T5goTA.jpeg"
            }
            alt="img-blur-shadow"
            layout="fill"
          />
        </CardHeader>
        <CardBody>
          <Typography variant="h5" color="white" className="mb-2">
            Malicious URL detector
          </Typography>
          <Typography>
            Powered by advanced machine learning techniques, this model is
            specifically trained to identify and classify URLs as either safe or
            malicious. By analyzing various features and patterns in the URLs,
            such as domain reputation, URL structure, and content, our model can
            accurately flag potentially harmful links.
          </Typography>
        </CardBody>
        <CardFooter className="pt-0 flex justify-between">
          <Link to={"/malicious-url-detection"}>
            <Button className="bg-white text-black">Try</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  </MainLayout>
);

export default Home;
