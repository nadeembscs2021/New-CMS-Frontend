"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import "./teacherForm.module.css";

const schema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be at most 20 characters"),
  email: z.string().email("Invalid email address"),
  name: z.string().min(1, "First name is required"),
  phone: z.string().min(1, "Phone is required"),
  address: z.string().min(1, "Address is required"),
  bloodType: z.string().min(1, "Blood type is required"),
  birthDate: z.string().min(1, "Birthday is required"),
  classId: z.string().min(1, "Please select a class"),
  subject: z.string().min(1, "Please select a subject"),
  gender: z.enum(["male", "female", "other"], {
    required_error: "Gender is required",
    invalid_type_error: "Select a valid gender",
  }),
  password: z.string().min(8, "Password must be at least 8 characters"),
  // img: z.string().optional(),
});

type TeacherFormValues = z.infer<typeof schema>;

const TeacherForm = ({
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
    watch,
    reset,
  } = useForm<TeacherFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      ...data,
      birthDate: data?.birthDate
        ? new Date(data.birthDate).toISOString().split("T")[0]
        : "",
      classId: data?.classId || "",
      subject: data?.subject || "",
      // img: data?.img || "",
    },
  });

  const [classes, setClasses] = useState([
    {
      _id: "",
      className: "",
    },
  ]);
  const [subjects, setSubjects] = useState([
    {
      _id: "",
      name: "",
    },
  ]);

  useEffect(() => {
    const fetchClasses = async () => {
      const apiResponse = await fetch("http://localhost:4000/api/v1/class");
      const data = await apiResponse.json();

      if (data.success) {
        setClasses(data.data);
      }
    };

    const fetchSubjects = async () => {
      const apiResponse = await fetch("http://localhost:4000/api/v1/subject");
      const data = await apiResponse.json();

      if (data.success) {
        setSubjects(data.data);
      }
    };

    fetchClasses();
    fetchSubjects();
  }, []);

  const onSubmit = handleSubmit(async (formData) => {
    try {
      let apiResponse;
      if (type === "create") {
        apiResponse = await fetch("http://localhost:4000/api/v1/teacher", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
      } else if (type === "update") {
        apiResponse = await fetch(
          `http://localhost:4000/api/v1/teacher/${data._id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );
      }
      const response = await apiResponse?.json();
      if (response.success) {
        setOpen(false);
      }
      console.log(response);
    } catch (error) {
      console.error("Submission error:", error);
    }
  });

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
          <form onSubmit={onSubmit} action="#" className="space-y-8">
            {/* Profile Image Upload */}
            {/* <div className="flex flex-col items-center mb-8">
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
            </div> */}

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
                <div className="space-y-2 md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <input
                    type="password"
                    {...register("password")}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 ${
                      errors.password ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.password && (
                    <p className="text-sm text-red-500 transition-opacity duration-300">
                      {errors.password.message}
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
              <div className=" space-y-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <input
                    {...register("name")}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200 ${
                      errors.name ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.name && (
                    <p className="text-sm text-red-500 transition-opacity duration-300">
                      {errors.name.message}
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
                    {...register("birthDate")}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200 ${
                      errors.birthDate ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.birthDate && (
                    <p className="text-sm text-red-500 transition-opacity duration-300">
                      {errors.birthDate.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2 relative">
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
                      {...register("classId")}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 appearance-none ${
                        errors.classId ? "border-red-500" : "border-gray-300"
                      }`}
                    >
                      <option value="">Select Class</option>
                      {classes.map((classItem) => (
                        <option key={classItem._id} value={classItem._id}>
                          {classItem.className}
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
                  {errors.classId && (
                    <p className="text-sm text-red-500 transition-opacity duration-300">
                      {errors.classId.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Subjects
                  </label>
                  <div className="relative">
                    <select
                      {...register("subject")}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 appearance-none ${
                        errors.subject ? "border-red-500" : "border-gray-300"
                      }`}
                    >
                      <option value="">Select Subject</option>
                      {subjects.map((subject) => (
                        <option key={subject._id} value={subject._id}>
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
                  {errors.subject && (
                    <p className="text-sm text-red-500 transition-opacity duration-300">
                      {errors.subject.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
            {/* Footer with action buttons - sticky at bottom */}
            <div className="p-6 border-t bg-white z-10">
              <div className="flex justify-end gap-4 ">
                <button
                  type="button"
                  onClick={() => reset()}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-all duration-300 transform hover:-translate-y-0.5"
                >
                  Reset
                </button>
                <button
                  type="submit"
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
          </form>
        </div>
      </div>
    </div>
  );
};

export default TeacherForm;
