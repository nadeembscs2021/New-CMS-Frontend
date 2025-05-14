"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Image from "next/image";
import { useState } from "react";

const schema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be at most 20 characters"),
  email: z.string().email("Invalid email address"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  phone: z.string().min(1, "Phone is required"),
  address: z.string().min(1, "Address is required"),
  gender: z.enum(["male", "female", "other"], {
    required_error: "Gender is required",
    invalid_type_error: "Select a valid gender",
  }),
  studentName: z.string().min(1, "Student name is required"),
  img: z.string().optional(),
});

type ParentFormValues = z.infer<typeof schema>;

const ParentsForm = ({
  type,
  data,
  onClose,
}: {
  type: "create" | "update";
  data?: any;
  onClose?: () => void;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
    reset,
  } = useForm<ParentFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      ...data,
    },
  });

  const [imageUploading, setImageUploading] = useState(false);
  const profileImage = watch("img");

  const onSubmit = async (formData: ParentFormValues) => {
    try {
      console.log("Form submitted:", formData);
      // Add your form submission logic here
      if (onClose) {
        onClose();
      }
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-4xl w-full h-[90vh] mx-auto flex flex-col bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300">
        {/* Header */}
        <div className="p-6 border-b bg-white sticky top-0 z-10">
          <h1 className="text-2xl font-bold text-gray-800">
            {type === "create" ? "Create New Parent" : "Update Parent Profile"}
          </h1>
        </div>

        {/* Scrollable content area */}
        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
          <form
            id="parentForm"
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-8"
          >
            {/* Profile Image Upload */}
            <div className="flex flex-col items-center mb-8">
              <div className="relative w-32 h-32 rounded-full border-4 border-white shadow-lg overflow-hidden mb-4 group transition-all duration-300">
                <Image
                  src={profileImage || "/noAvatar.png"}
                  alt="Profile"
                  width={128}
                  height={128}
                  className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <button
                type="button"
                onClick={() => document.getElementById("imageUpload")?.click()}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                disabled={imageUploading}
              >
                <span>{imageUploading ? "Uploading..." : "Upload Photo"}</span>
              </button>
              <input
                id="imageUpload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files?.[0]) {
                    setImageUploading(true);
                    // Simulate upload
                    setTimeout(() => {
                      setValue("img", URL.createObjectURL(e.target.files![0]));
                      setImageUploading(false);
                    }, 1000);
                  }
                }}
              />
            </div>

            {/* Personal Information */}
            <div className="space-y-6 bg-gray-50 p-6 rounded-lg shadow-sm transition-all duration-300 hover:shadow-md">
              <h2 className="text-lg font-semibold text-gray-700 border-b pb-2 flex items-center">
                <span className="w-1 h-6 bg-teal-500 rounded-full mr-2"></span>
                Personal Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    First Name
                  </label>
                  <input
                    {...register("firstName")}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200 ${
                      errors.firstName ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.firstName && (
                    <p className="text-sm text-red-500 transition-opacity duration-300">
                      {errors.firstName.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Last Name
                  </label>
                  <input
                    {...register("lastName")}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200 ${
                      errors.lastName ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.lastName && (
                    <p className="text-sm text-red-500 transition-opacity duration-300">
                      {errors.lastName.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Gender
                  </label>
                  <select
                    {...register("gender")}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200 ${
                      errors.gender ? "border-red-500" : "border-gray-300"
                    }`}
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.gender && (
                    <p className="text-sm text-red-500 transition-opacity duration-300">
                      {errors.gender.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Username
                  </label>
                  <input
                    {...register("username")}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200 ${
                      errors.username ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.username && (
                    <p className="text-sm text-red-500 transition-opacity duration-300">
                      {errors.username.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-6 bg-gray-50 p-6 rounded-lg shadow-sm transition-all duration-300 hover:shadow-md">
              <h2 className="text-lg font-semibold text-gray-700 border-b pb-2 flex items-center">
                <span className="w-1 h-6 bg-blue-500 rounded-full mr-2"></span>
                Contact Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    {...register("email")}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500 transition-opacity duration-300">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Phone
                  </label>
                  <input
                    {...register("phone")}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${
                      errors.phone ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.phone && (
                    <p className="text-sm text-red-500 transition-opacity duration-300">
                      {errors.phone.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Address
                  </label>
                  <input
                    {...register("address")}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${
                      errors.address ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.address && (
                    <p className="text-sm text-red-500 transition-opacity duration-300">
                      {errors.address.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Student Information */}
            <div className="space-y-6 bg-gray-50 p-6 rounded-lg shadow-sm transition-all duration-300 hover:shadow-md">
              <h2 className="text-lg font-semibold text-gray-700 border-b pb-2 flex items-center">
                <span className="w-1 h-6 bg-indigo-500 rounded-full mr-2"></span>
                Student Information
              </h2>
              <div className="grid grid-cols-1 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Student Name
                  </label>
                  <input
                    {...register("studentName")}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 ${
                      errors.studentName ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.studentName && (
                    <p className="text-sm text-red-500 transition-opacity duration-300">
                      {errors.studentName.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* Footer with action buttons */}
        <div className="p-6 border-t bg-white sticky bottom-0 z-10">
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => reset()}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-all duration-300 transform hover:-translate-y-0.5"
            >
              Reset
            </button>
            <button
              type="submit"
              form="parentForm"
              disabled={isSubmitting}
              className={`px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 ${
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

export default ParentsForm;
