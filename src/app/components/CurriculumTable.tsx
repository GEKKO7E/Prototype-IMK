import { useState } from "react";
import { Input } from "./ui/input";
import { Search } from "lucide-react";

export default function CurriculumTable() {
  const [searchQuery, setSearchQuery] = useState("");

  const curriculumData = [
    {
      no: 1,
      semester: "I",
      code: "20371708",
      name: "Olahraga",
      credits: 2,
      lecturer: "Gita Indah Marthasari, Ir., ST., M Kom",
    },
    {
      no: 2,
      semester: "I",
      code: "20371717",
      name: "Organisasi dan Arsitektur Komputer",
      credits: 3,
      lecturer: "Muhammad Irfan, Ir., MT",
    },
    {
      no: 3,
      semester: "I",
      code: "20371970",
      name: "Pengantar Teknologi Informasi",
      credits: 2,
      lecturer: "Hardianto Wibowo, S Kom, MT",
    },
    {
      no: 4,
      semester: "I",
      code: "20373579",
      name: "Kalkulus",
      credits: 2,
      lecturer: "Sofyan Arifianto, S Si., M Kom",
    },
    {
      no: 5,
      semester: "I",
      code: "20374801",
      name: "Pemrograman Dasar",
      credits: 4,
      lecturer: "Haryady, S Kom, MT",
    },
    {
      no: 6,
      semester: "I",
      code: "20375726",
      name: "Keimanan dan Kemanuslaan",
      credits: 1,
      lecturer: "Ishomuddin, Prof. Dr., M.Si",
    },
    {
      no: 7,
      semester: "I",
      code: "20375835",
      name: "Productive Skills of Foreign Languages for Specific Purpose",
      credits: 2,
      lecturer: "Gita Indah Marthasari, Ir., ST., M Kom",
    },
    {
      no: 8,
      semester: "I",
      code: "10371729",
      name: "Pancasila",
      credits: 2,
      lecturer: "Gita Indah Marthasari, Ir., ST., M Kom",
    },
    {
      no: 9,
      semester: "I",
      code: "20370189",
      name: "Bahasa Indonesia",
      credits: 2,
      lecturer: "Gita Indah Marthasari, Ir., ST., M Kom",
    },
  ];

  const filteredData = curriculumData.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.lecturer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h1 className="text-2xl text-gray-900 dark:text-white">Kurikulum</h1>
      </div>

      <div className="mb-4">
        <Input
          type="text"
          placeholder="Cari mata kuliah..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-md"
        />
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden border border-gray-200 dark:border-gray-700">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                <th className="px-4 py-3 text-left text-sm text-gray-700 dark:text-gray-200">
                  No
                </th>
                <th className="px-4 py-3 text-left text-sm text-gray-700 dark:text-gray-200">
                  Sem. Kurikulum
                </th>
                <th className="px-4 py-3 text-left text-sm text-gray-700 dark:text-gray-200">
                  Kode MK
                </th>
                <th className="px-4 py-3 text-left text-sm text-gray-700 dark:text-gray-200">
                  Mata Kuliah
                </th>
                <th className="px-4 py-3 text-left text-sm text-gray-700 dark:text-gray-200">
                  SKS
                </th>
                <th className="px-4 py-3 text-left text-sm text-gray-700 dark:text-gray-200">
                  Pengampu
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item, index) => (
                <tr
                  key={item.no}
                  className={`
                    ${
                      index % 2 === 0
                        ? "bg-blue-900 dark:bg-blue-950"
                        : "bg-blue-800 dark:bg-blue-900"
                    }
                    border-b border-blue-700 dark:border-blue-800 hover:bg-blue-700 dark:hover:bg-blue-800 transition-colors
                  `}
                >
                  <td className="px-4 py-3 text-sm text-white">{item.no}</td>
                  <td className="px-4 py-3 text-sm text-white">
                    {item.semester}
                  </td>
                  <td className="px-4 py-3 text-sm text-white">{item.code}</td>
                  <td className="px-4 py-3 text-sm text-white">{item.name}</td>
                  <td className="px-4 py-3 text-sm text-white">
                    {item.credits}
                  </td>
                  <td className="px-4 py-3 text-sm text-white">
                    {item.lecturer}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}