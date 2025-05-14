"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  className: z.string().min(1, { message: "Class name is required!" }),
  section: z.string().min(1, { message: "Section is required!" }),
  capacity: z.string().min(1, { message: "Capacity is required!" }),
});

type Inputs = z.infer<typeof schema>;

const ClassForm = ({
  type,
  data,
  setOpen,
}: {
  type: "create" | "update";
  data?: any;
  setOpen: (open: boolean) => void;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
    defaultValues: {
      className: data?.className || "",
      section: data?.section || "",
      capacity: data?.capacity.toString() || "",
    },
  });

  const onSubmit = handleSubmit(async (formData) => {
    console.log(formData);
    let apiResponse;
    if (type === "create") {
      apiResponse = await fetch("http://localhost:4000/api/v1/class", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
    } else {
      apiResponse = await fetch(
        `http://localhost:4000/api/v1/class/${data._id}`,
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
    if (apiData.success) setOpen(false);
    console.log(apiData);
  });

  return (
    <div className="flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-2xl w-full mx-auto flex flex-col bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-purple-700 text-white text-lg font-semibold p-2 rounded-t-lg">
          {type === "create" ? "Create Class" : "Update Class"}
        </div>

        {/* Scrollable content area */}
        <div className="p-4">
          <form onSubmit={onSubmit} className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-600">
                    Class Name
                  </label>
                  <input
                    type="text"
                    {...register("className")}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200"
                    placeholder="Enter class name"
                  />
                  {errors.className && (
                    <p className="text-sm text-red-500">
                      {errors.className?.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-600">
                    Section
                  </label>
                  <input
                    type="text"
                    {...register("section")}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200"
                    placeholder="Enter section"
                  />
                  {errors.section && (
                    <p className="text-sm text-red-500">
                      {errors.section.message}
                    </p>
                  )}
                </div>
                <div className="col-span-2 space-y-2">
                  <label className="block text-sm font-medium text-gray-600">
                    Capacity
                  </label>
                  <input
                    type="text"
                    {...register("capacity")}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200"
                    placeholder="Enter capacity"
                  />
                  {errors.capacity && (
                    <p className="text-sm text-red-500">
                      {errors.capacity.message}
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
            {type === "create" ? "Create Class" : "Update Class"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClassForm;
