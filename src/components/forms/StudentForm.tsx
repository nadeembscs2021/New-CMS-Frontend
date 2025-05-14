"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
  password: z.string().min(8, "Password must be at least 8 characters"),
  address: z.string().min(1, "Address is required"),
  bloodType: z.string().min(1, "Blood type is required"),
  birthday: z.string().min(1, "Birthday is required"),
  parentName: z.string().min(1, "Parent name is required"),
  parentPhone: z.string().min(1, "Parent phone is required"),
  class: z.string().min(1, "Class is required"),
  section: z.string().min(1, "Section is required"),
  gender: z.enum(["male", "female", "other"], {
    required_error: "Gender is required",
    invalid_type_error: "Select a valid gender",
  }),
});

type StudentFormValues = z.infer<typeof schema>;

const CLASS_OPTIONS = [
  { id: "1", name: "1st Year" },
  { id: "2", name: "2nd Year" },
];

const SECTION_OPTIONS = [
  { id: "a", name: "Section A" },
  { id: "b", name: "Section B" },
  { id: "c", name: "Section C" },
  { id: "d", name: "Section D" },
];

const StudentForm = ({
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
  } = useForm<StudentFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      ...data,
      birthday: data?.birthday
        ? new Date(data.birthday).toISOString().split("T")[0]
        : "",
    },
  });

  const [imageUploading, setImageUploading] = useState(false);

  const onSubmit = handleSubmit(async (formData) => {
    try {
      console.log("Form submitted:", formData);
      // Add your form submission logic here
    } catch (error) {
      console.error("Submission error:", error);
    }
  });

  return (
    <div className="flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-2xl w-full mx-auto flex flex-col bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-purple-700 text-white text-lg font-semibold p-2 rounded-t-lg">
          {type === "create" ? "Create New Student" : "Update Student Profile"}
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
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-600">
                    First Name
                  </label>
                  <input
                    {...register("firstName")}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all ${
                      errors.firstName ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.firstName && (
                    <p className="text-sm text-red-500">
                      {errors.firstName.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-600">
                    Last Name
                  </label>
                  <input
                    {...register("lastName")}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all ${
                      errors.lastName ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.lastName && (
                    <p className="text-sm text-red-500">
                      {errors.lastName.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-600">
                    Gender
                  </label>
                  <select
                    {...register("gender")}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all ${
                      errors.gender ? "border-red-500" : "border-gray-300"
                    }`}
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.gender && (
                    <p className="text-sm text-red-500">
                      {errors.gender.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-600">
                    Birthday
                  </label>
                  <input
                    type="date"
                    {...register("birthday")}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all ${
                      errors.birthday ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.birthday && (
                    <p className="text-sm text-red-500">
                      {errors.birthday.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-600">
                    Blood Type
                  </label>
                  <select
                    {...register("bloodType")}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all ${
                      errors.bloodType ? "border-red-500" : "border-gray-300"
                    }`}
                  >
                    <option value="">Select Blood Type</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                  {errors.bloodType && (
                    <p className="text-sm text-red-500">
                      {errors.bloodType.message}
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

            {/* Academic Information */}
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold text-gray-700 border-b pb-2 flex items-center">
                <span className="w-1 h-6 bg-indigo-500 rounded-full mr-2"></span>
                Academic Information
              </h2>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-600">
                    Class
                  </label>
                  <select
                    {...register("class")}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all ${
                      errors.class ? "border-red-500" : "border-gray-300"
                    }`}
                  >
                    <option value="">Select Class</option>
                    {CLASS_OPTIONS.map((classItem) => (
                      <option key={classItem.id} value={classItem.id}>
                        {classItem.name}
                      </option>
                    ))}
                  </select>
                  {errors.class && (
                    <p className="text-sm text-red-500">
                      {errors.class.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-600">
                    Section
                  </label>
                  <select
                    {...register("section")}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all ${
                      errors.section ? "border-red-500" : "border-gray-300"
                    }`}
                  >
                    <option value="">Select Section</option>
                    {SECTION_OPTIONS.map((section) => (
                      <option key={section.id} value={section.id}>
                        {section.name}
                      </option>
                    ))}
                  </select>
                  {errors.section && (
                    <p className="text-sm text-red-500">
                      {errors.section.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Guardian Information */}
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold text-gray-700 border-b pb-2 flex items-center">
                <span className="w-1 h-6 bg-purple-500 rounded-full mr-2"></span>
                Guardian Information
              </h2>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-600">
                    Parent/Guardian Name
                  </label>
                  <input
                    {...register("parentName")}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all ${
                      errors.parentName ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.parentName && (
                    <p className="text-sm text-red-500">
                      {errors.parentName.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-600">
                    Phone Number
                  </label>
                  <input
                    {...register("parentPhone")}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all ${
                      errors.parentPhone ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.parentPhone && (
                    <p className="text-sm text-red-500">
                      {errors.parentPhone.message}
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
              ? "Create Student"
              : "Update Student"}
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

export default StudentForm;
