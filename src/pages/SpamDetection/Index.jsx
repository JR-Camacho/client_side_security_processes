import { useState } from "react";

import useApi from "../../hooks/useApi";

import MainLayout from "../../layouts/MainLayout";

import Title from "../../components/Title";
import FormFields from "../../components/FormFields";
import LoadingAndErrorCard from "../../components/LoadingAndErrorCard";

import { API_URL, SPAM_ERROR } from "../../utils/UtilitiesConts";

import { Typography } from "@material-tailwind/react";

const Index = () => {
  const { loading, isError, data, error, post } = useApi();

  const [textEmail, setTextEmail] = useState({ email_text: "" });
  const [fileEmail, setFileEmail] = useState({ email_file: null });

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("email_file", fileEmail.email_file);
    await post(
      `${API_URL}/spam-detector/`,
      fileEmail.email_file ? formData : textEmail
    );
  };

  const {
    sender,
    recipients,
    date_time,
    html_tags_count,
    words_count,
    language,
  } = data ? data.email_info : {};

  return (
    <MainLayout>
      <div className="min-h-screen">
        <Title
          title={"Introduce a email for make predictions"}
          className={"pt-[100px]"}
        />
        <div className="w-full flex justify-center my-8">
          <div className="w-11/12 sm:w-3/4 flex flex-col lg:flex-row h-full">
            <div className="relative w-full lg:w-3/5 bg-black h-auto lg:h-[470px] flex flex-col justify-between p-2">
              <Typography color="white" className="my-2 text-justify">
                This model has been designed to effectively identify and
                categorize emails into different classes, such as spam and
                non-spam. Using machine learning techniques, this classifier
                analyzes key features of the emails, such as content, sender,
                subject, and among others.
              </Typography>
              <FormFields
                textName={"email_text"}
                fileName={"email_file"}
                label={"Email Content"}
                loading={loading}
                textValue={textEmail}
                setTextValue={setTextEmail}
                setFileValue={setFileEmail}
                handleClick={handleSubmit}
              />
            </div>
            {data && !isError ? (
              <div className="w-full lg:w-2/5 h-auto lg:min-h-[550px] pb-4 bg-[#1e293b] text-white lg:shadow-2xl shadow-black">
                <Typography className="text-center text-2xl mt-6 font-bold">
                  Email Scanning details
                </Typography>
                <div className="border-t w-11/12 my-6 m-auto opacity-70"></div>
                <div className="mx-2 flex">
                  <Typography className="font-bold">From:</Typography>
                  <Typography className="ml-2">{sender}</Typography>
                </div>
                <div className="mx-2 mt-2">
                  <Typography className="font-bold">Recipients:</Typography>
                  {recipients.map((recipient, index) => (
                    <Typography key={index}>{recipient}</Typography>
                  ))}
                </div>
                <div className="mx-2 flex mt-2">
                  <Typography className="font-bold">DATE:</Typography>
                  <Typography className="ml-2">{date_time}</Typography>
                </div>
                <div className="mx-2 flex mt-2">
                  <Typography className="font-bold">
                    Email HTML Tags Count:
                  </Typography>
                  <Typography className="ml-2">{html_tags_count}</Typography>
                </div>
                <div className="mx-2 flex mt-2">
                  <Typography className="font-bold">
                    Email Words Count:
                  </Typography>
                  <Typography className="ml-2">{words_count}</Typography>
                </div>
                <div className="mx-2 flex mt-2">
                  <Typography className="font-bold">Languague:</Typography>
                  <Typography className="ml-2">{language}</Typography>
                </div>
                <div className="border-t w-11/12 my-6 m-auto opacity-70"></div>
                <div className="mx-2 flex flex-col items-center mt-4">
                  <Typography className="font-bold text-2xl">
                    Diagnosis{" "}
                  </Typography>
                  <Typography
                    className={`ml-2 uppercase ${
                      data.prediction == "spam"
                        ? "text-red-500 "
                        : "text-green-300"
                    }`}
                  >
                    {data.prediction}
                  </Typography>
                </div>
              </div>
            ) : (
              <LoadingAndErrorCard
                isError={isError}
                loading={loading}
                errorMessage={
                  error && error.error == SPAM_ERROR
                    ? "Incomplete Email"
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
