import React from "react";

const ResultForm = ({
  type,
  data,
  setOpen,
}: {
  type: "create" | "update" | "delete";
  data?: any;
  setOpen: (open: boolean) => void;
}) => {
  return <div>ResultForm</div>;
};

export default ResultForm;
