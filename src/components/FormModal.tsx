"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";

// USE LAZY LOADING

// import TeacherForm from "./forms/TeacherForm";
// import StudentForm from "./forms/StudentForm";

const TeacherForm = dynamic(() => import("./forms/TeacherForm"), {
  loading: () => <h1>Loading...</h1>,
});
const StudentForm = dynamic(() => import("./forms/StudentForm"), {
  loading: () => <h1>Loading...</h1>,
});
const ClassForm = dynamic(() => import("./forms/ClassForm"), {
  loading: () => <h1>Loading...</h1>,
});
const SubjectForm = dynamic(() => import("./forms/SubjectForm"), {
  loading: () => <h1>Loading...</h1>,
});
const ExamForm = dynamic(() => import("./forms/ExamForm"), {
  loading: () => <h1>Loading...</h1>,
});
const ResultForm = dynamic(() => import("./forms/ResultForm"), {
  loading: () => <h1>Loading...</h1>,
});
const ParentForm = dynamic(() => import("./forms/ParentForm"), {
  loading: () => <h1>Loading...</h1>,
});

const FormModal = ({
  table,
  type,
  data,
  id,
}: {
  table:
    | "teacher"
    | "student"
    | "parent"
    | "subject"
    | "class"
    | "lesson"
    | "exam"
    | "assignment"
    | "result"
    | "attendance"
    | "event"
    | "announcement";
  type: "create" | "update" | "delete";
  data?: any;
  id?: string;
}) => {
  const size = type === "create" ? "w-8 h-8" : "w-7 h-7";
  const bgColor =
    type === "create"
      ? "bg-lamaYellow"
      : type === "update"
      ? "bg-lamaSky"
      : "bg-lamaPurple";

  const [open, setOpen] = useState(false);

  const forms: {
    [key: string]: (type: "create" | "update", data?: any) => JSX.Element;
  } = {
    teacher: (type, data) => (
      <TeacherForm type={type} data={data} setOpen={setOpen} />
    ),
    student: (type, data) => (
      <StudentForm type={type} data={data} setOpen={setOpen} />
    ),
    class: (type, data) => (
      <ClassForm type={type} data={data} setOpen={setOpen} />
    ),
    subject: (type, data) => (
      <SubjectForm type={type} data={data} setOpen={setOpen} />
    ),
    exam: (type, data) => (
      <ExamForm type={type} data={data} setOpen={setOpen} />
    ),
    result: (type, data) => (
      <ResultForm type={type} data={data} setOpen={setOpen} />
    ),
    parent: (type, data) => (
      <ParentForm type={type} data={data} setOpen={setOpen} />
    ),
  };

  const Form = () => {
    const handleDelete = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const apiResponse = await fetch(
        `http://localhost:4000/api/v1/${table}/${id}`,
        {
          method: "DELETE",
        }
      );
      const data = await apiResponse.json();
      if (data.success) {
       setOpen(false);
        toast.success(data.message);
      } else {
        setOpen(false);
        toast.error(data.message);
      }
      console.log(data);
    };

    return type === "delete" && id ? (
      <form onSubmit={handleDelete} className="p-4 flex flex-col gap-4">
        <span className="text-center font-medium">
          All data will be lost. Are you sure you want to delete this {table}?
        </span>
        <button className="bg-red-700 text-white py-2 px-4 rounded-md border-none w-max self-center">
          Delete
        </button>
      </form>
    ) : type === "create" || type === "update" ? (
      forms[table](type, data)
    ) : (
      "Form not found!"
    );
  };

  return (
    <>
      <button
        className={`${size} flex items-center justify-center rounded-full ${bgColor}`}
        onClick={() => setOpen(true)}
      >
        <Image src={`/${type}.png`} alt="" width={16} height={16} />
      </button>
      {open && (
        <div className="w-screen h-screen absolute left-0 top-0 bg-black bg-opacity-60 z-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-md relative w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%]">
            <Form />
            <div
              className="absolute top-4 right-4 cursor-pointer"
              onClick={() => setOpen(false)}
            >
              <Image src="/close.png" alt="" width={14} height={14} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FormModal;
