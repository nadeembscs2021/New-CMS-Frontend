"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { revalidateList } from "@/actions/revalidate";
import toast from "react-hot-toast";

const schema = z.object({
  name: z.string().min(1, { message: "Subject name is required!" }),
  classId: z.string().min(1, { message: "Class is required!" }),
});

type Inputs = z.infer<typeof schema>;

const SubjectsForm = ({
  type,
  data,
  setOpen,
}: {
  type: "create" | "update";
  data?: any;
  setOpen: any;
}) => {
  console.log("data", data);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: data?.name || "",
      classId: data?.classId?.className || "",
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
    if (apiData.success) {
      setOpen(false);
      toast.success(apiData.message);
    } else {
      setOpen(false);
      toast.error(apiData.message);
    }
    // await revalidateList("/list/subjects");
    setOpen(false);
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
    <div className="flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-2xl w-full mx-auto flex flex-col bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-purple-700 text-white text-lg font-semibold p-2 rounded-t-lg">
          {type === "create" ? "Create Subject" : "Update Subject"}
        </div>

        {/* Scrollable content area */}
        <div className="p-4">
          <form onSubmit={onSubmit} className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-600">
                    Subject Name
                  </label>
                  <input
                    type="text"
                    {...register("name")}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200"
                    placeholder="Enter subject name"
                  />
                  {errors.name && (
                    <p className="text-sm text-red-500">
                      {errors.name.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-600">
                    Class
                  </label>
                  <select
                    {...register("classId")}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200"
                  >
                    <option value="">Select Class</option>
                    {classes.map((classItem: any) => (
                      <option key={classItem._id} value={classItem._id}>
                        {classItem.className} - {classItem.section}
                      </option>
                    ))}
                  </select>
                  {errors.classId && (
                    <p className="text-sm text-red-500">
                      {errors.classId.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* Buttons */}
        <div className="p-4 border-t bg-white flex justify-end gap-4">
          <button
            type="button"
            className="px-4 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={onSubmit}
            className="px-4 py-2 bg-purple-700 text-white rounded-lg hover:bg-purple-800 transition"
          >
            {type === "create" ? "Create Subject" : "Update Subject"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubjectsForm;
