import React from "react";

const ExamForm = ({
  type,
  data,
  setOpen,
}: {
  type: "create" | "update" | "delete";
  data?: any;
  setOpen: (open: boolean) => void;
}) => {
  return <div>ExamForm</div>;
};

export default ExamForm;
