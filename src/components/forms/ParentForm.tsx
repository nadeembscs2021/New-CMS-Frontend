"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const schema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be at most 20 characters"),
  email: z.string().email("Invalid email address"),
  fatherName: z.string().min(1, "Father name is required"),
  phone: z.string().min(1, "Phone is required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  address: z.string().min(1, "Address is required"),
  studentId: z.string().min(1, "Class is required"),
});

type ParentFormValues = z.infer<typeof schema>;

const ParentForm = ({
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
    formState: { errors, isSubmitting },
    setValue,
    reset,
  } = useForm<ParentFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      ...data,
      birthday: data?.birthday
        ? new Date(data.birthday).toISOString().split("T")[0]
        : "",
    },
  });

  const onSubmit = handleSubmit(async (formData) => {
    try {
      let apiResponse;
      if (type === "create") {
        apiResponse = await fetch("http://localhost:4000/api/v1/parent", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
      } else {
        apiResponse = await fetch(
          `http://localhost:4000/api/v1/parent/${data._id}`,
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
    } catch (error) {
      console.error("Submission error:", error);
    }
  });

  const [students, setStudents] = useState<{ _id: string; name: string }[]>([]);

  useEffect(() => {
    const fetchStudents = async () => {
      const apiResponse = await fetch("http://localhost:4000/api/v1/student");
      const data = await apiResponse.json();
      setStudents(data.data);
    };

    fetchStudents();
  }, []);

  return (
    <div className="flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-2xl w-full mx-auto flex flex-col bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-purple-700 text-white text-lg font-semibold p-2 rounded-t-lg">
          {type === "create" ? "Create New Parent" : "Update Parent Profile"}
        </div>

        {/* Scrollable content area */}
        <div className="overflow-y-auto max-h-[70vh] p-4 custom-scrollbar">
          <form onSubmit={onSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold text-gray-700 border-b pb-2 flex items-center">
                <span className="w-1 h-6 bg-teal-500 rounded-full mr-2"></span>
                Personal Information
              </h2>
              <div className="grid grid-cols-1 gap-4 mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-600">
                      Father Name
                    </label>
                    <input
                      {...register("fatherName")}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all ${
                        errors.fatherName ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.fatherName && (
                      <p className="text-sm text-red-500">
                        {errors.fatherName.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-600">
                      Address
                    </label>
                    <input
                      {...register("address")}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all ${
                        errors.address ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.address && (
                      <p className="text-sm text-red-500">
                        {errors.address.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold text-gray-700 border-b pb-2 flex items-center">
                <span className="w-1 h-6 bg-blue-500 rounded-full mr-2"></span>
                Contact Information
              </h2>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-600">
                    Username
                  </label>
                  <input
                    {...register("username")}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${
                      errors.username ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.username && (
                    <p className="text-sm text-red-500">
                      {errors.username.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-600">
                    Email
                  </label>
                  <input
                    type="email"
                    {...register("email")}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-600">
                    Password
                  </label>
                  <input
                    type="password"
                    {...register("password")}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${
                      errors.password ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.password && (
                    <p className="text-sm text-red-500">
                      {errors.password.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-600">
                    Phone
                  </label>
                  <input
                    {...register("phone")}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${
                      errors.phone ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.phone && (
                    <p className="text-sm text-red-500">
                      {errors.phone.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Student Information */}
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold text-gray-700 border-b pb-2 flex items-center">
                <span className="w-1 h-6 bg-indigo-500 rounded-full mr-2"></span>
                Student Information
              </h2>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-600">
                    Student Name
                  </label>
                  <select
                    {...register("studentId")}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all ${
                      errors.studentId ? "border-red-500" : "border-gray-300"
                    }`}
                  >
                    <option value="">Select Student</option>
                    {students.map((student) => (
                      <option key={student._id} value={student._id}>
                        {student.name}
                      </option>
                    ))}
                  </select>
                  {errors.studentId && (
                    <p className="text-sm text-red-500">
                      {errors.studentId.message}
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
            onClick={() => reset()}
            className="px-4 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition"
          >
            Reset
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            onClick={onSubmit}
            className={`px-4 py-2 bg-purple-700 text-white rounded-lg hover:bg-purple-800 transition ${
              isSubmitting ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting
              ? "Processing..."
              : type === "create"
              ? "Create Parent"
              : "Update Parent"}
          </button>
        </div>
      </div>

      {/* Custom scrollbar styles */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #c5c7d0;
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #9fa6b2;
        }
      `}</style>
    </div>
  );
};

export default ParentForm;
