import { Course } from "./Dashboard";

interface SelectedCoursesTableProps {
  selectedCourses: Array<{ course: Course; classCode: string }>;
  onRemoveCourse: (courseId: string) => void;
}

export default function SelectedCoursesTable({
  selectedCourses,
  onRemoveCourse,
}: SelectedCoursesTableProps) {
  if (selectedCourses.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8 text-center">
        <p className="text-gray-500 dark:text-gray-400">
          Belum ada mata kuliah yang dipilih
        </p>
      </div>
    );
  }

  const totalSKS = selectedCourses.reduce(
    (sum, item) => sum + item.course.credits,
    0
  );

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gradient-to-r from-blue-600 to-emerald-600 dark:from-blue-700 dark:to-emerald-700">
              <th className="px-4 py-3 text-left text-sm text-white">
                Matakuliah
              </th>
              <th className="px-4 py-3 text-center text-sm text-white">
                SKS
              </th>
              <th className="px-4 py-3 text-center text-sm text-white">
                Kelas
              </th>
              <th className="px-4 py-3 text-center text-sm text-white">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {selectedCourses.map((item, index) => (
              <tr
                key={item.course.id}
                className={`
                  ${
                    index % 2 === 0
                      ? "bg-gray-50 dark:bg-gray-900"
                      : "bg-white dark:bg-gray-800"
                  }
                  hover:bg-blue-50 dark:hover:bg-blue-950 transition-colors
                `}
              >
                <td className="px-4 py-4">
                  <div>
                    <div className="text-sm text-gray-900 dark:text-white">
                      {item.course.name}
                    </div>
                    <div className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                      {item.course.code}
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4 text-center">
                  <span className="inline-flex items-center justify-center w-8 h-8 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm">
                    {item.course.credits}
                  </span>
                </td>
                <td className="px-4 py-4 text-center">
                  <span className="inline-flex items-center justify-center px-3 py-1 bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 rounded-full text-sm">
                    {item.classCode}
                  </span>
                </td>
                <td className="px-4 py-4 text-center">
                  <button
                    onClick={() => onRemoveCourse(item.course.id)}
                    className="px-4 py-1.5 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded-lg hover:bg-red-200 dark:hover:bg-red-800 transition-colors text-sm"
                  >
                    Batal
                  </button>
                </td>
              </tr>
            ))}
            <tr className="bg-gradient-to-r from-blue-50 to-emerald-50 dark:from-blue-950 dark:to-emerald-950">
              <td className="px-4 py-4 text-sm text-gray-900 dark:text-white">
                <strong>Total SKS</strong>
              </td>
              <td className="px-4 py-4 text-center">
                <span className="inline-flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-600 to-emerald-600 text-white rounded-full">
                  {totalSKS}
                </span>
              </td>
              <td colSpan={2}></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
