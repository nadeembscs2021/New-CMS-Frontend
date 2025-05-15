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
      className="bg-white rounded-lg shadow-md p-4 max-w-md mx-auto"
    >
      <div className="bg-purple-700 text-white text-lg font-semibold p-2 rounded-t-lg">
        {type === "create" ? "Create New Exam" : "Update Exam"}
      </div>

      {/* Form Fields in 2-column layout */}
      <div className="grid grid-cols-2 gap-4 p-4">
        {/* Row 1: Exam Title & Class */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-600">
            Exam Title
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            className="border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., Math Midterm"
          />
          {errors.title && (
            <span className="text-red-500 text-xs">{errors.title}</span>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-600">Class</label>
          <select
            value={formData.class}
            onChange={(e) =>
              setFormData({ ...formData, class: e.target.value })
            }
            className="border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Class</option>
            <option value="class1">1st Year</option>
            <option value="class2">2nd Year</option>
          </select>
          {errors.class && (
            <span className="text-red-500 text-xs">{errors.class}</span>
          )}
        </div>

        {/* Row 2: Subject & Teacher */}
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
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-600">Teacher Name</label>
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

        {/* Row 3: Start Date & End Date */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-600">
            Start Date
          </label>
          <input
            type="date"
            value={formData.startDate}
            onChange={(e) =>
              setFormData({ ...formData, startDate: e.target.value })
            }
            className="border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.startDate && (
            <span className="text-red-500 text-xs">{errors.startDate}</span>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-600">End Date</label>
          <input
            type="date"
            value={formData.endDate}
            onChange={(e) =>
              setFormData({ ...formData, endDate: e.target.value })
            }
            className="border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.endDate && (
            <span className="text-red-500 text-xs">{errors.endDate}</span>
          )}
        </div>

        {/* Row 4: Duration */}
        <div className="col-span-2 flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-600">
            Duration (minutes)
          </label>
          <input
            type="number"
            value={formData.duration}
            onChange={(e) =>
              setFormData({ ...formData, duration: e.target.value })
            }
            className="border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            placeholder="e.g., 120"
          />
          {errors.duration && (
            <span className="text-red-500 text-xs">{errors.duration}</span>
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
          {type === "create" ? "Create Exam" : "Update Exam"}
        </button>
      </div>
    </form>
  );
};

export default ExamForm;
