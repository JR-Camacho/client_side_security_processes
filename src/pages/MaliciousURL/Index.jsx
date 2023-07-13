import { useState } from "react";

import useApi from "../../hooks/useApi";

import MainLayout from "../../layouts/MainLayout";

import Title from "../../components/Title";
import DialogModal from "../../components/DialogModal";

import { API_URL, URL_ERROR } from "../../utils/UtilitiesConts";

import {
  Button,
  IconButton,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import { LinkIcon } from "@heroicons/react/24/outline";

const Index = () => {
  const { loading, isError, data, error, post } = useApi();

  const [url, setUrl] = useState({ url: "" });
  const [openModal, setOpenModal] = useState(false);

  const handleSetTextData = (e) => setUrl({ url: e.target.value });

  const handleOpenModal = () => setOpenModal(!openModal);

  const handleCopyClick = () => navigator.clipboard.writeText(url);

  const clear = () => setUrl({ url: "" });

  const handleSubmit = async () => {
    await post(`${API_URL}/malicious-url-detector/`, url);
    setOpenModal(true);
  };

  console.log(error)

  return (
    <MainLayout>
      {openModal && (
        <DialogModal
          handleOpen={handleOpenModal}
          isError={isError}
          error={
            error && error.error == URL_ERROR
              ? "Incomplete URL"
              : "Submission Error!"
          }
          response={
            data &&
            `This is a ${data.prediction == 1 ? "PHISHING" : "BENIGN"} url`
          }
        />
      )}
      <div className="h-screen">
        <Title title={"Introduce a url for analize"} className={"pt-[100px]"} />
        <div className="w-full h-[60vh] flex justify-center my-8">
          <div className="relative w-11/12 md:w-[56rem] bg-black h-auto md:h-[420px] flex flex-col justify-between rounded-2xl p-2 bg-[#010817]">
            <Typography color="white" className="my-2">
              This model is specifically trained to identify and classify URLs
              as either safe or malicious. By analyzing various features and
              patterns in the URLs, such as domain reputation, URL structure,
              and content, our model can accurately flag potentially harmful
              links.
            </Typography>
            <Textarea
              size="md"
              label="https://example.com"
              rows={11}
              value={url.url}
              onChange={handleSetTextData}
              className="text-white"
            />
            <div className="w-full flex justify-between py-1.5">
              <div className="flex gap-2">
                <IconButton
                  variant="text"
                  color="blue-gray"
                  size="sm"
                  onClick={handleCopyClick}
                >
                  <LinkIcon strokeWidth={2} className="w-4 h-4" />
                </IconButton>
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  color="red"
                  variant="text"
                  className="rounded-md"
                  onClick={clear}
                >
                  Clear
                </Button>
                <Button
                  size="sm"
                  className="rounded-md"
                  onClick={handleSubmit}
                  disabled={loading}
                >
                  Analyze
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;
