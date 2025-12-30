import { X } from "lucide-react";
import { Course } from "./Dashboard";

interface ClassSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  course: Course | null;
  onSelectClass: (classCode: string) => void;
}

export default function ClassSelectionModal({
  isOpen,
  onClose,
  course,
  onSelectClass,
}: ClassSelectionModalProps) {
  if (!isOpen || !course) return null;

  const availableClasses = ["A", "B", "C", "D", "E", "F", "G", "H"];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto border border-gray-200 dark:border-gray-700">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-emerald-600 dark:from-blue-700 dark:to-emerald-700 px-6 py-4 flex items-center justify-between rounded-t-xl">
          <div>
            <h3 className="text-xl text-white">
              Pilih Kelas
            </h3>
            <p className="text-sm text-blue-100 mt-1">
              {course.code} - {course.name}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:bg-white/20 rounded-lg p-2 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          <div className="mb-4">
            <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
              <span className="flex items-center gap-2">
                <span className="font-semibold text-gray-900 dark:text-white">SKS:</span>
                {course.credits}
              </span>
              <span className="flex items-center gap-2">
                <span className="font-semibold text-gray-900 dark:text-white">Biaya:</span>
                Rp {course.cost.toLocaleString("id-ID")}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {availableClasses.map((classCode) => (
              <button
                key={classCode}
                onClick={() => {
                  onSelectClass(classCode);
                  onClose();
                }}
                className="group relative bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-700 dark:to-slate-800 hover:from-blue-50 hover:to-emerald-50 dark:hover:from-blue-900 dark:hover:to-emerald-900 border-2 border-slate-200 dark:border-slate-600 hover:border-blue-500 dark:hover:border-emerald-500 rounded-xl p-6 transition-all duration-200 hover:shadow-lg hover:scale-105"
              >
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-full flex items-center justify-center text-white text-xl group-hover:scale-110 transition-transform">
                    {classCode}
                  </div>
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Kelas {classCode}
                  </span>
                </div>
              </button>
            ))}
          </div>

          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
            <p className="text-sm text-blue-800 dark:text-blue-200">
              <span className="font-semibold">Jadwal:</span>{" "}
              {course.schedule.map((s) => `${s.day} ${s.time}`).join(", ")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
