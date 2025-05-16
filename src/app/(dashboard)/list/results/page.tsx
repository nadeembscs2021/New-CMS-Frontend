"use client";
import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { resultsData, role } from "@/lib/data";
import Image from "next/image";
import { useEffect, useState } from "react";

type Result = {
  _id: string;
  title: string;
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
  studentId: {
    _id: string;
    name: string;
  };
  marks: number;
};

const columns = [
  {
    header: "Title",
    accessor: "title",
  },
  {
    header: "Subject Name",
    accessor: "name",
  },
  {
    header: "Student",
    accessor: "student",
  },
  {
    header: "Score",
    accessor: "score",
    className: "hidden md:table-cell",
  },
  {
    header: "Teacher",
    accessor: "teacher",
    className: "hidden md:table-cell",
  },
  {
    header: "Class",
    accessor: "class",
    className: "hidden md:table-cell",
  },
  {
    header: "Actions",
    accessor: "action",
  },
];

const ResultListPage = () => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      const apiResponse = await fetch("http://localhost:4000/api/v1/result");
      const data = await apiResponse.json();
      setResults(data.data);
      console.log(data.data);
    };

    fetchResults();
  }, []);

  const renderRow = (item: Result) => (
    <tr
      key={item._id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
    >
      <td className="p-4">{item.title}</td>
      <td className="">{item.subject?.name}</td>
      <td>{item.studentId?.name}</td>
      <td className="hidden md:table-cell">{item.marks}</td>
      <td className="hidden md:table-cell">{item.teacher?.name}</td>
      <td className="hidden md:table-cell">
        {item.classId?.className} - {item.classId?.section}
      </td>
      <td>
        <div className="flex items-center gap-2">
          {(role === "admin" || role === "teacher") && (
            <>
              <FormModal table="result" type="update" data={item} />
              <FormModal table="result" type="delete" id={item._id} />
            </>
          )}
        </div>
      </td>
    </tr>
  );

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Results</h1>
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
              <FormModal table="result" type="create" />
            )}
          </div>
        </div>
      </div>
      {/* LIST */}
      <Table columns={columns} renderRow={renderRow} data={results} />
      {/* PAGINATION */}
      <Pagination />
    </div>
  );
};

export default ResultListPage;
