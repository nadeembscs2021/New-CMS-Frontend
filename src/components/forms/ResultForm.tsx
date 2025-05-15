"use client";

import { useState } from "react";

interface ResultFormProps {
  type: "create" | "update";
  data?: {
    _id?: string;
    title: string;
    studentId: string;
    classId: string;
    subject: string;
    marks: number;
    teacher: string;
  };
  setOpen: (open: boolean) => void;
}

const ResultForm = ({ type, data, setOpen }: ResultFormProps) => {
  const [formData, setFormData] = useState({
    title: data?.title || "",
    studentId: data?.studentId || "",
    classId: data?.classId || "",
    subject: data?.subject || "",
    marks: data?.marks || "",
    teacher: data?.teacher || "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.title) newErrors.title = "Title is required";
    if (!formData.studentId) newErrors.studentId = "Student is required";
    if (!formData.classId) newErrors.classId = "Class is required";
    if (!formData.subject) newErrors.subject = "Subject is required";
    if (!formData.marks || formData.marks < 0)
      newErrors.marks = "Valid marks are required";
    if (!formData.teacher) newErrors.teacher = "Teacher is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const url =
        type === "create"
          ? "http://localhost:4000/api/v1/results"
          : `http://localhost:4000/api/v1/results/${data?._id}`;
      const method = type === "create" ? "POST" : "PUT";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          marks: Number(formData.marks),
        }),
      });

      if (!response.ok) throw new Error("Failed to submit result");
      setOpen(false);
    } catch (error) {
      console.error("Error submitting result:", error);
      setErrors({ submit: "Failed to submit result. Please try again." });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-lg shadow-md p-4 max-w-md mx-auto"
    >
      <div className="bg-purple-700 text-white text-lg font-semibold p-2 rounded-t-lg">
        {type === "create" ? "Create New Result" : "Update Result"}
      </div>

      {/* Form Fields in 2-column layout */}
      <div className="grid grid-cols-2 gap-4 p-4">
        {/* Row 1: Result Title & Student */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-600">
            Result Title
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            className="border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., Math Midterm Result"
          />
          {errors.title && (
            <span className="text-red-500 text-xs">{errors.title}</span>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-600">Student</label>
          <select
            value={formData.studentId}
            onChange={(e) =>
              setFormData({ ...formData, studentId: e.target.value })
            }
            className="border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Student</option>
            <option value="student1">Student Name</option>
          </select>
          {errors.studentId && (
            <span className="text-red-500 text-xs">{errors.studentId}</span>
          )}
        </div>

        {/* Row 2: Class & Subject */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-600">Class</label>
          <select
            value={formData.classId}
            onChange={(e) =>
              setFormData({ ...formData, classId: e.target.value })
            }
            className="border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Class</option>
            <option value="class1">1st Year</option>
            <option value="class2">2nd Year</option>
          </select>
          {errors.classId && (
            <span className="text-red-500 text-xs">{errors.classId}</span>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-600">Subject</label>
          <select
            value={formData.subject}
            onChange={(e) =>
              setFormData({ ...formData, subject: e.target.value })
            }
            className="border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Subject</option>
            <option value="subject1">Computer Science</option>
            <option value="subject1">Maths</option>
            <option value="subject1">Physics</option>
            <option value="subject2">Biology</option>
            <option value="subject1">Chemistry</option>
            <option value="subject1">English</option>
            <option value="subject1">Urdu</option>
            <option value="subject1">PakStudy</option>
            <option value="subject1">Islamiyat</option>
          </select>
          {errors.subject && (
            <span className="text-red-500 text-xs">{errors.subject}</span>
          )}
        </div>

        {/* Row 3: Marks & Teacher */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-600">Marks</label>
          <input
            type="number"
            value={formData.marks}
            onChange={(e) =>
              setFormData({ ...formData, marks: e.target.value })
            }
            className="border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., 85"
          />
          {errors.marks && (
            <span className="text-red-500 text-xs">{errors.marks}</span>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-600">Teacher</label>
          <select
            value={formData.teacher}
            onChange={(e) =>
              setFormData({ ...formData, teacher: e.target.value })
            }
            className="border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Teacher</option>
            <option value="teacher1">Teacher Name</option>
          </select>
          {errors.teacher && (
            <span className="text-red-500 text-xs">{errors.teacher}</span>
          )}
        </div>
      </div>

      {/* Submit Error */}
      {errors.submit && (
        <span className="text-red-500 text-sm text-center block mt-2">
          {errors.submit}
        </span>
      )}

      {/* Buttons */}
      <div className="flex justify-end gap-4 p-4 border-t border-gray-200">
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="bg-gray-200 text-gray-700 py-1.5 px-4 rounded-md hover:bg-gray-300 transition"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-purple-700 text-white py-1.5 px-4 rounded-md hover:bg-purple-800 transition"
        >
          {type === "create" ? "Create Result" : "Update Result"}
        </button>
      </div>
    </form>
  );
};

export default ResultForm;
