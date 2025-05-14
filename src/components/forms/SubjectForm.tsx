"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useEffect, useState } from "react";

const schema = z.object({
  subjectName: z.string().min(1, { message: "Subject name is required!" }),
  className: z.string().min(1, { message: "Class is required!" }),
  section: z.string().min(1, { message: "Section is required!" }),
  teacherName: z.string().min(1, { message: "Teacher name is required!" }),
});

type Inputs = z.infer<typeof schema>;

const SubjectsForm = ({
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
    defaultValues: {
      subjectName: data?.name || "",
      className: data?.classId?.className || "",
      section: data?.section || "",
      teacherName: data?.teacherName || "",
    },
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
    <div className="bg-white rounded-lg shadow-md p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Create New Subject
      </h1>

      <form className="space-y-6" onSubmit={onSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Subject Name Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Subject Name
            </label>
            <select
              {...register("subjectName")}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Subject</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Maths">Maths</option>
              <option value="Physics">Physics</option>
              <option value="Biology">Biology</option>
              <option value="Chemistry">Chemistry</option>
              <option value="English">English</option>
              <option value="Urdu">Urdu</option>
              <option value="PakStudy">PakStudy</option>
              <option value="Islamiyat">Islamiyat</option>
            </select>
            {errors.subjectName && (
              <p className="mt-1 text-sm text-red-600">
                {errors.subjectName.message}
              </p>
            )}
          </div>

          {/* Class Name Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Class
            </label>
            <select
              {...register("className")}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Class</option>
              <option value="1st Year">1st Year</option>
              <option value="2nd Year">2nd Year</option>
            </select>
            {errors.className && (
              <p className="mt-1 text-sm text-red-600">
                {errors.className.message}
              </p>
            )}
          </div>

          {/* Section Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Section
            </label>
            <select
              {...register("section")}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Section</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
            </select>
            {errors.section && (
              <p className="mt-1 text-sm text-red-600">
                {errors.section.message}
              </p>
            )}
          </div>

          {/* Teacher Name Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Teacher Name
            </label>
            <input
              type="text"
              {...register("teacherName")}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter teacher's name"
            />
            {errors.teacherName && (
              <p className="mt-1 text-sm text-red-600">
                {errors.teacherName.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-end space-x-4 pt-4">
          <button
            type="button"
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {type === "create" ? "Create Subject" : "Update Subject"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SubjectsForm;
