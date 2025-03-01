import { Spinner } from "@fluentui/react-components";
import React from "react";


const ATMBackdrop = () => {
  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity ${
         "opacity-100 visible"}`}
    >
        <Spinner size="huge"/>
    </div>
  );
};

export default ATMBackdrop;
