import { Box } from "@mui/material";
import React from "react";
import { useSearchParams } from "react-router-dom";
const PaymentSuccess = () => {
  const seachQuery = useSearchParams()[0];

  const referenceNum = seachQuery.get("reference");
  return (
    <Box>
      <Box h="100vh" justifyContent={"center"}>
        <h1 textTransform={"uppercase"}> Order Successfull</h1>

        <h3>Reference No.{referenceNum}</h3>
      </Box>
    </Box>
  );
};

export default PaymentSuccess;
