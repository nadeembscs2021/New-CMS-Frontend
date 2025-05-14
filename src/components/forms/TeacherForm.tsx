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
  bloodType: z.string().min(1, "Blood type is required"),
  birthday: z.string().min(1, "Birthday is required"),
  sex: z.enum(["male", "female", "other"], {
    required_error: "Gender is required",
    invalid_type_error: "Select a valid gender",
  }),
  classes: z.string().min(1, "Please select a class"),
  subjects: z.string().min(1, "Please select a subject"),
  img: z.string().optional(),
});

type TeacherFormValues = z.infer<typeof schema>;

const CLASS_OPTIONS = [
  { id: "1st-year", name: "1st Year" },
  { id: "2nd-year", name: "2nd Year" },
  { id: "both-class", name: "Both" },
];

const SUBJECT_OPTIONS = [
  { id: "computer-science", name: "Computer Science" },
  { id: "maths", name: "Maths" },
  { id: "physics", name: "Physics" },
  { id: "biology", name: "Biology" },
  { id: "chemistry", name: "Chemistry" },
  { id: "english", name: "English" },
  { id: "urdu", name: "Urdu" },
  { id: "pakstudy", name: "PakStudy" },
  { id: "islamiyat", name: "Islamiyat" },
];

const TeacherForm = ({
  type,
  data,
}: {
  type: "create" | "update";
  data?: any;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
    reset,
  } = useForm<TeacherFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      ...data,
      birthday: data?.birthday
        ? new Date(data.birthday).toISOString().split("T")[0]
        : "",
      classes: data?.classes || "",
      subjects: data?.subjects || "",
      img: data?.img || "",
    },
  });

  const [imageUploading, setImageUploading] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState({
    classes: false,
    subjects: false,
    gender: false,
  });

  const selectedClasses = watch("classes") || "";
  const selectedSubjects = watch("subjects") || "";
  const profileImage = watch("img");

  const onSubmit = handleSubmit(async (data) => {
    try {
      console.log("Form submitted:", data);
      // Add your form submission logic here
    } catch (error) {
      console.error("Submission error:", error);
    }
  });

  const toggleDropdown = (field: keyof typeof dropdownOpen) => {
    setDropdownOpen((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  return (
    // Wrapper with fixed height and scrolling behavior
    <div className="h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-4xl w-full h-[90vh] mx-auto flex flex-col bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300">
        {/* Header with sticky positioning */}
        <div className="p-6 border-b bg-white sticky top-0 z-10">
          <h1 className="text-2xl font-bold text-gray-800">
            {type === "create"
              ? "Create New Teacher"
              : "Update Teacher Profile"}
          </h1>
        </div>

        {/* Scrollable content area */}
        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
          <form onSubmit={onSubmit} className="space-y-8">
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

            {/* Authentication Information */}
            <div className="space-y-6 bg-gray-50 p-6 rounded-lg shadow-sm transition-all duration-300 hover:shadow-md">
              <h2 className="text-lg font-semibold text-gray-700 border-b pb-2 flex items-center">
                <span className="w-1 h-6 bg-indigo-600 rounded-full mr-2"></span>
                Authentication Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Username
                  </label>
                  <input
                    {...register("username")}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 ${
                      errors.username ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.username && (
                    <p className="text-sm text-red-500 transition-opacity duration-300">
                      {errors.username.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    {...register("email")}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500 transition-opacity duration-300">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>
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
                    Phone
                  </label>
                  <input
                    {...register("phone")}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200 ${
                      errors.phone ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.phone && (
                    <p className="text-sm text-red-500 transition-opacity duration-300">
                      {errors.phone.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Address
                  </label>
                  <input
                    {...register("address")}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200 ${
                      errors.address ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.address && (
                    <p className="text-sm text-red-500 transition-opacity duration-300">
                      {errors.address.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Blood Type
                  </label>
                  <input
                    {...register("bloodType")}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200 ${
                      errors.bloodType ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.bloodType && (
                    <p className="text-sm text-red-500 transition-opacity duration-300">
                      {errors.bloodType.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Birthday
                  </label>
                  <input
                    type="date"
                    {...register("birthday")}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200 ${
                      errors.birthday ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.birthday && (
                    <p className="text-sm text-red-500 transition-opacity duration-300">
                      {errors.birthday.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2 relative">
                  <label className="block text-sm font-medium text-gray-700">
                    Gender
                  </label>
                  <select
                    {...register("sex")}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200 ${
                      errors.sex ? "border-red-500" : "border-gray-300"
                    }`}
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.sex && (
                    <p className="text-sm text-red-500 transition-opacity duration-300">
                      {errors.sex.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Academic Information */}
            <div className="space-y-6 bg-gray-50 p-6 rounded-lg shadow-sm transition-all duration-300 hover:shadow-md">
              <h2 className="text-lg font-semibold text-gray-700 border-b pb-2 flex items-center">
                <span className="w-1 h-6 bg-blue-500 rounded-full mr-2"></span>
                Academic Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Classes
                  </label>
                  <div className="relative">
                    <select
                      {...register("classes")}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 appearance-none ${
                        errors.classes ? "border-red-500" : "border-gray-300"
                      }`}
                    >
                      <option value="">Select Class</option>
                      {CLASS_OPTIONS.map((classItem) => (
                        <option key={classItem.id} value={classItem.id}>
                          {classItem.name}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                      <svg
                        className="h-5 w-5 text-gray-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                  {errors.classes && (
                    <p className="text-sm text-red-500 transition-opacity duration-300">
                      {errors.classes.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Subjects
                  </label>
                  <div className="relative">
                    <select
                      {...register("subjects")}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 appearance-none ${
                        errors.subjects ? "border-red-500" : "border-gray-300"
                      }`}
                    >
                      <option value="">Select Subject</option>
                      {SUBJECT_OPTIONS.map((subject) => (
                        <option key={subject.id} value={subject.id}>
                          {subject.name}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                      <svg
                        className="h-5 w-5 text-gray-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                  {errors.subjects && (
                    <p className="text-sm text-red-500 transition-opacity duration-300">
                      {errors.subjects.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* Footer with action buttons - sticky at bottom */}
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
              form="teacher-form"
              disabled={isSubmitting}
              className={`px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 ${
                isSubmitting ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting
                ? "Processing..."
                : type === "create"
                ? "Create Teacher"
                : "Update Teacher"}
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

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .form-section {
          animation: fadeIn 0.4s ease-out;
        }
      `}</style>
    </div>
  );
};

export default TeacherForm;
