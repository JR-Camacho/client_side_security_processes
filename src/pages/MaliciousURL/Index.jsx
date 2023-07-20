import { useState } from "react";

import useApi from "../../hooks/useApi";

import MainLayout from "../../layouts/MainLayout";

import Title from "../../components/Title";
import LoadingAndErrorCard from "../../components/LoadingAndErrorCard";
import FormFields from "../../components/FormFields";

import { API_URL, URL_ERROR } from "../../utils/UtilitiesConts";

import { Typography } from "@material-tailwind/react";

const Index = () => {
  const { loading, isError, data, error, post } = useApi();

  const [url, setUrl] = useState({ url: "" });

  const handleSubmit = async () => {
    await post(`${API_URL}/malicious-url-detector/`, url);
  };

  return (
    <MainLayout>
      <div className="min-h-screen">
        <Title title={"Introduce a url for analize"} className={"pt-[100px]"} />
        <div className="w-full flex justify-center my-8">
          <div className="w-11/12 sm:w-3/4 flex flex-col lg:flex-row h-full">
            <div className="relative w-full lg:w-3/5 bg-black h-auto lg:h-[470px] flex flex-col justify-between  p-2">
              <Typography color="white" className="my-2 text-justify">
                This model is specifically trained to identify and classify URLs
                as either safe or malicious. By analyzing various features and
                patterns in the URLs, such as domain reputation, URL structure,
                and content, our model can accurately flag potentially harmful
                links.
              </Typography>
              <FormFields
                textName={"url"}
                label={"https://example.com"}
                loading={loading}
                textValue={url}
                setTextValue={setUrl}
                handleClick={handleSubmit}
              />
            </div>
            {data && !isError ? (
              <div className="w-full lg:w-2/5 h-auto lg:min-h-[550px] pb-4 bg-[#1e293b] text-white lg:shadow-2xl shadow-black">
                <Typography className="text-center text-2xl mt-6 font-bold">
                  URL Scanning details
                </Typography>
                <div className="border-t w-11/12 my-6 m-auto opacity-70"></div>
                <div className="mx-2 flex">
                  <Typography className="font-bold">URL:</Typography>
                  <a
                    href={data.url_info.url}
                    target="_blank"
                    className="underline text-blue-500 ml-2"
                  >
                    {data.url_info.url}
                  </a>
                </div>
                <div className="mx-2 flex mt-2">
                  <Typography className="font-bold">Domain or IP:</Typography>
                  <Typography className="ml-2">
                    {data.url_info.domain_or_ip}
                  </Typography>
                </div>
                <div className="mx-2 flex mt-2">
                  <Typography className="font-bold">URL Length:</Typography>
                  <Typography className="ml-2">
                    {data.url_info.url_length}
                  </Typography>
                </div>
                <div className="mx-2 flex mt-2">
                  <Typography className="font-bold">
                    URL Symbol Count:
                  </Typography>
                  <Typography className="ml-2">
                    {data.url_info.symbol_count}
                  </Typography>
                </div>
                <div className="mx-2 flex mt-2">
                  <Typography className="font-bold">Protocol:</Typography>
                  <Typography className="ml-2">
                    {data.url_info.protocol}
                  </Typography>
                </div>
                <div className="border-t w-11/12 my-6 m-auto opacity-70"></div>
                <div className="mx-2 flex mt-4">
                  <Typography className="font-bold">
                    Malware Diagnosis:{" "}
                  </Typography>
                  <Typography
                    className={`ml-2 ${
                      data.is_malware == 1 ? "text-red-500 " : "text-green-300"
                    }`}
                  >
                    {data.is_malware == 1
                      ? "Malware Risk"
                      : "No Malware Issues"}
                  </Typography>
                </div>
                <div className="mx-2 flex mt-4">
                  <Typography className="font-bold">
                    SPAM Diagnosis:{" "}
                  </Typography>
                  <Typography
                    className={`ml-2 ${
                      data.is_spam == 1 ? "text-red-500 " : "text-green-300"
                    }`}
                  >
                    {data.is_spam == 1 ? "SPAM Risk" : "No SPAM Issues"}
                  </Typography>
                </div>
                <div className="mx-2 flex mt-4">
                  <Typography className="font-bold">
                    Phishing Diagnosis:{" "}
                  </Typography>
                  <Typography
                    className={`ml-2 ${
                      data.is_phishing == 1 ? "text-red-500 " : "text-green-300"
                    }`}
                  >
                    {data.is_phishing == 1
                      ? "Phishing Risk"
                      : "No Phishing Issues"}
                  </Typography>
                </div>
                <div className="border-t w-11/12 my-6 m-auto opacity-70"></div>
                <div className="mx-2 flex flex-col items-center mt-4">
                  <Typography className="font-bold text-2xl">
                    General Risk Status
                  </Typography>
                  <Typography
                    className={`ml-2 text-xl ${
                      data.risk_level == 0
                        ? "text-green-300"
                        : data.risk_level == 1
                        ? "text-yellow-400"
                        : data.risk_level == 2
                        ? "text-red-300"
                        : data.risk_level == 3
                        ? "text-black"
                        : ""
                    }`}
                  >
                    {data.risk_level == 0
                      ? "Safe URL"
                      : data.risk_level == 1
                      ? "Low Risk"
                      : data.risk_level == 2
                      ? "Mid Risk"
                      : data.risk_level == 3
                      ? "Hight Risk"
                      : ""}
                  </Typography>
                </div>
              </div>
            ) : (
              <LoadingAndErrorCard
                isError={isError}
                loading={loading}
                errorMessage={
                  error && error.error == URL_ERROR
                    ? "Incomplete URL"
                    : "Submision Error"
                }
              />
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;