import { Typography } from "@material-tailwind/react";
import { ExclamationTriangle, ShieldExclamation } from "react-bootstrap-icons";

const LoadingAndErrorCard = ({ errorMessage, isError, loading }) => {
  return (
    <div className="w-full lg:w-2/5 h-[300px] lg:h-auto lg:min-h-[470px] bg-[#1e293b] text-white flex flex-col justify-center items-center">
      {loading && !isError ? (
        <Typography className="text-4xl font-bold">Analizing...</Typography>
      ) : !isError && !loading ? (
        <ShieldExclamation height={200} width={200} />
      ) : null}
      {isError && (
        <>
          <Typography className="text-3xl text-red-500">
            {errorMessage}
          </Typography>
          <ExclamationTriangle height={100} width={100} color="red" />
        </>
      )}
    </div>
  );
};

export default LoadingAndErrorCard;
