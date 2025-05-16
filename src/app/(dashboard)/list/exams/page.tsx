"use client";
import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { role } from "@/lib/data";
import Image from "next/image";
import { useEffect, useState } from "react";

type Exam = {
  _id: string;
  subject: {
    _id: string;
    name: string;
  };
  classId: {
    _id: string;
    className: string;
    section: string;
  };
  teacher: {
    _id: string;
    name: string;
  };
  startDate: string;
  endDate: string;
  duration: string;
};

const columns = [
  {
    header: "Subject Name",
    accessor: "name",
  },
  {
    header: "Class",
    accessor: "class",
  },
  {
    header: "Teacher",
    accessor: "teacher",
    className: "hidden md:table-cell",
  },
  {
    header: "Date",
    accessor: "date",
    className: "hidden md:table-cell",
  },
  {
    header: "Duration",
    accessor: "duration",
    className: "hidden md:table-cell",
  },
  {
    header: "Actions",
    accessor: "action",
  },
];

const ExamListPage = () => {
  const [exams, setExams] = useState<Exam[]>([]);

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/v1/exam");
        const data = await response.json();
        setExams(data.data);
      } catch (error) {
        console.error("Error fetching exams:", error);
      }
    };

    fetchExams();
  }, []);

  const renderRow = (item: Exam) => (
    <tr
      key={item._id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
    >
      <td className="flex items-center gap-4 p-4">{item.subject?.name}</td>
      <td>
        {item.classId?.className} - {item.classId?.section}
      </td>
      <td className="hidden md:table-cell">{item.teacher?.name}</td>
      <td className="hidden md:table-cell">
        {item.startDate} - {item.endDate}
      </td>
      <td className="hidden md:table-cell">{item.duration}</td>
      <td>
        <div className="flex items-center gap-2">
          {(role === "admin" || role === "teacher") && (
            <div className="flex items-center gap-2">
              <FormModal table="exam" type="update" data={item} />
              <FormModal table="exam" type="delete" id={item._id} />
            </div>
          )}
        </div>
      </td>
    </tr>
  );

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Exams</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/filter.png" alt="" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/sort.png" alt="" width={14} height={14} />
            </button>
            {(role === "admin" || role === "teacher") && (
              <FormModal table="exam" type="create" />
            )}
          </div>
        </div>
      </div>
      {/* LIST */}
      <Table columns={columns} renderRow={renderRow} data={exams} />
      {/* PAGINATION */}
      <Pagination />
    </div>
  );
};

export default ExamListPage;
