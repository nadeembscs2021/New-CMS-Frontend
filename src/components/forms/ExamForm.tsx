"use client";

import { useState } from "react";

interface ExamFormProps {
  type: "create" | "update";
  data?: {
    _id?: string;
    title: string;
    class: string;
    subject: string;
    teacher: string;
    startDate: string;
    endDate: string;
    duration: number;
  };
  setOpen: (open: boolean) => void;
}

const ExamForm = ({ type, data, setOpen }: ExamFormProps) => {
  const [formData, setFormData] = useState({
    title: data?.title || "",
    class: data?.class || "",
    subject: data?.subject || "",
    teacher: data?.teacher || "",
    startDate: data?.startDate
      ? new Date(data.startDate).toISOString().split("T")[0]
      : "",
    endDate: data?.endDate
      ? new Date(data.endDate).toISOString().split("T")[0]
      : "",
    duration: data?.duration || "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.title) newErrors.title = "Title is required";
    if (!formData.class) newErrors.class = "Class is required";
    if (!formData.subject) newErrors.subject = "Subject is required";
    if (!formData.teacher) newErrors.teacher = "Teacher is required";
    if (!formData.startDate) newErrors.startDate = "Start date is required";
    if (!formData.endDate) newErrors.endDate = "End date is required";
    if (!formData.duration || formData.duration <= 0)
      newErrors.duration = "Valid duration is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const url =
        type === "create"
          ? "http://localhost:4000/api/v1/exams"
          : `http://localhost:4000/api/v1/exams/${data?._id}`;
      const method = type === "create" ? "POST" : "PUT";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          duration: Number(formData.duration),
        }),
      });

      if (!response.ok) throw new Error("Failed to submit exam");
      setOpen(false);
    } catch (error) {
      console.error("Error submitting exam:", error);
      setErrors({ submit: "Failed to submit exam. Please try again." });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 flex flex-col gap-6 bg-white rounded-md shadow-md max-w-lg mx-auto"
    >
      <h2 className="text-xl font-semibold text-gray-800">
        {type === "create" ? "Create Exam" : "Update Exam"}
      </h2>

      {/* Title */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700">Exam Title</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) =>
            setFormData({ ...formData, title: e.target.value })
          }
          className="border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          placeholder="e.g., Math Midterm"
        />
        {errors.title && (
          <span className="text-red-500 text-xs">{errors.title}</span>
        )}
      </div>

      {/* Class (Dropdown Placeholder) */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700">Class</label>
        <select
          value={formData.class}
          onChange={(e) =>
            setFormData({ ...formData, class: e.target.value })
          }
          className="border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        >
          <option value="">Select Class</option>
          {/* Replace with dynamic data from backend */}
          <option value="class1">Class 1</option>
          <option value="class2">Class 2</option>
        </select>
        {errors.class && (
          <span className="text-red-500 text-xs">{errors.class}</span>
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

      {/* Start Date */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700">Start Date</label>
        <input
          type="date"
          value={formData.startDate}
          onChange={(e) =>
            setFormData({ ...formData, startDate: e.target.value })
          }
          className="border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
        {errors.startDate && (
          <span className="text-red-500 text-xs">{errors.startDate}</span>
        )}
      </div>

      {/* End Date */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700">End Date</label>
        <input
          type="date"
          value={formData.endDate}
          onChange={(e) =>
            setFormData({ ...formData, endDate: e.target.value })
          }
          className="border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
        {errors.endDate && (
          <span className="text-red-500 text-xs">{errors.endDate}</span>
        )}
      </div>

      {/* Duration */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700">
          Duration (minutes)
        </label>
        <input
          type="number"
          value={formData.duration}
          onChange={(e) =>
            setFormData({ ...formData, duration: e.target.value })
          }
          className="border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          placeholder="e.g., 120"
        />
        {errors.duration && (
          <span className="text-red-500 text-xs">{errors.duration}</span>
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
          {type === "create" ? "Create Exam" : "Update Exam"}
        </button>
      </div>
    </form>
  );
};

export default ExamForm;