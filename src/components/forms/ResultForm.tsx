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
      className="p-6 flex flex-col gap-6 bg-white rounded-md shadow-md max-w-lg mx-auto"
    >
      <h2 className="text-xl font-semibold text-gray-800">
        {type === "create" ? "Create Result" : "Update Result"}
      </h2>

      {/* Title */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700">
          Result Title
        </label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          placeholder="e.g., Math Midterm Result"
        />
        {errors.title && (
          <span className="text-red-500 text-xs">{errors.title}</span>
        )}
      </div>

      {/* Student (Dropdown Placeholder) */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700">Student</label>
        <select
          value={formData.studentId}
          onChange={(e) =>
            setFormData({ ...formData, studentId: e.target.value })
          }
          className="border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        >
          <option value="">Select Student</option>
          {/* Replace with dynamic data from backend */}
          <option value="student1">Student 1</option>
          <option value="student2">Student 2</option>
        </select>
        {errors.studentId && (
          <span className="text-red-500 text-xs">{errors.studentId}</span>
        )}
      </div>

      {/* Class (Dropdown Placeholder) */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700">Class</label>
        <select
          value={formData.classId}
          onChange={(e) =>
            setFormData({ ...formData, classId: e.target.value })
          }
          className="border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        >
          <option value="">Select Class</option>
          {/* Replace with dynamic data from backend */}
          <option value="class1">Class 1</option>
          <option value="class2">Class 2</option>
        </select>
        {errors.classId && (
          <span className="text-red-500 text-xs">{errors.classId}</span>
        )}
      </div>

      {/* Subject (Dropdown Placeholder) */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700">Subject</label>
        <select
          value={formData.subject}
          onChange={(e) =>
            setFormData({ ...formData, subject: e.target.value })
          }
          className="border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        >
          <option value="">Select Subject</option>
          {/* Replace with dynamic data from backend */}
          <option value="subject1">Math</option>
          <option value="subject2">Science</option>
        </select>
        {errors.subject && (
          <span className="text-red-500 text-xs">{errors.subject}</span>
        )}
      </div>

      {/* Marks */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700">Marks</label>
        <input
          type="number"
          value={formData.marks}
          onChange={(e) => setFormData({ ...formData, marks: e.target.value })}
          className="border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          placeholder="e.g., 85"
        />
        {errors.marks && (
          <span className="text-red-500 text-xs">{errors.marks}</span>
        )}
      </div>

      {/* Teacher (Dropdown Placeholder) */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700">Teacher</label>
        <select
          value={formData.teacher}
          onChange={(e) =>
            setFormData({ ...formData, teacher: e.target.value })
          }
          className="border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        >
          <option value="">Select Teacher</option>
          {/* Replace with dynamic data from backend */}
          <option value="teacher1">Teacher 1</option>
          <option value="teacher2">Teacher 2</option>
        </select>
        {errors.teacher && (
          <span className="text-red-500 text-xs">{errors.teacher}</span>
        )}
      </div>

      {/* Submit Error */}
      {errors.submit && (
        <span className="text-red-500 text-sm text-center">
          {errors.submit}
        </span>
      )}

      {/* Buttons */}
      <div className="flex gap-4 justify-end">
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300 transition"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
        >
          {type === "create" ? "Create Result" : "Update Result"}
        </button>
      </div>
    </form>
  );
};

export default ResultForm;
