"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../InputField";
import { useEffect, useState } from "react";

const schema = z.object({
  name: z.string().min(1, { message: "Name is required!" }),
  classId: z.string().min(1, { message: "Class is required!" }),
});

type Inputs = z.infer<typeof schema>;

const StudentForm = ({
  type,
  data,
}: {
  type: "create" | "update";
  data?: any;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });

  const onSubmit = handleSubmit(async (formData) => {
    let apiResponse;
    if (type === "create") {
      apiResponse = await fetch("http://localhost:4000/api/v1/subject", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
    } else {
      apiResponse = await fetch(
        `http://localhost:4000/api/v1/subject/${data._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
    }
    const apiData = await apiResponse.json();
    console.log(apiData);
  });

  const [classes, setClasses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const apiResponse = await fetch("http://localhost:4000/api/v1/class");
      const data = await apiResponse.json();
      setClasses(data.data);
    };
    fetchData();
  }, []);

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">Create a new subject</h1>
      <div className="flex flex-col gap-4">
        <InputField
          label="Subject Name"
          name="name"
          defaultValue={data?.name}
          register={register}
          error={errors?.name}
        />
        <div className="flex flex-col gap-2 w-full">
          <label className="text-xs text-gray-500">Assign Teacher</label>
          <select
            {...register("classId")}
            defaultValue={data?.classId || ""}
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
          >
            <option value="">Select a class</option>
            {classes.map((classe: any) => (
              <option
                selected={classe._id === data?.classId._id}
                key={classe._id}
                value={classe._id}
              >
                {classe.className}
              </option>
            ))}
          </select>
          {errors.classId && (
            <p className="text-xs text-red-400">
              {errors.classId.message?.toString()}
            </p>
          )}
        </div>
      </div>
      <button className="bg-blue-400 text-white p-2 rounded-md">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default StudentForm;
