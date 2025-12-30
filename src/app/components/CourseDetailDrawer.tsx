import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "./ui/sheet";
import { Course } from "./Dashboard";
import { Badge } from "./ui/badge";
import { Calendar, Clock, BookOpen, AlertCircle } from "lucide-react";

interface CourseDetailDrawerProps {
  course: Course | null;
  onClose: () => void;
}

export default function CourseDetailDrawer({
  course,
  onClose,
}: CourseDetailDrawerProps) {
  if (!course) return null;

  return (
    <Sheet open={!!course} onOpenChange={onClose}>
      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle>{course.name}</SheetTitle>
          <SheetDescription>{course.code}</SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {/* Basic Info */}
          <div className="space-y-3">
            <h3 className="font-semibold flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Informasi Mata Kuliah
            </h3>
            <div className="space-y-2 pl-6">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Jumlah SKS:
                </span>
                <span className="font-medium">{course.credits} SKS</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Tingkat Kesulitan:
                </span>
                <Badge
                  variant="outline"
                  className={
                    course.difficulty === "easy"
                      ? "border-emerald-500 text-emerald-700 dark:text-emerald-400"
                      : course.difficulty === "medium"
                      ? "border-amber-500 text-amber-700 dark:text-amber-400"
                      : "border-red-500 text-red-700 dark:text-red-400"
                  }
                >
                  {course.difficulty === "easy"
                    ? "Mudah"
                    : course.difficulty === "medium"
                    ? "Sedang"
                    : "Sulit"}
                </Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Biaya:
                </span>
                <span className="font-medium">
                  Rp {course.cost.toLocaleString("id-ID")}
                </span>
              </div>
            </div>
          </div>

          {/* Schedule */}
          <div className="space-y-3">
            <h3 className="font-semibold flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Jadwal Perkuliahan
            </h3>
            <div className="space-y-2 pl-6">
              {course.schedule.map((sched, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 text-sm"
                >
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span>
                    {sched.day}, {sched.time}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Prerequisites */}
          {course.prerequisites.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-semibold flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                Mata Kuliah Prasyarat
              </h3>
              <div className="pl-6">
                <ul className="list-disc list-inside space-y-1">
                  {course.prerequisites.map((prereq, index) => (
                    <li key={index} className="text-sm text-gray-600 dark:text-gray-400">
                      {prereq}
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-amber-600 dark:text-amber-400 mt-2">
                  Pastikan Anda telah menyelesaikan mata kuliah prasyarat
                  sebelum mengambil mata kuliah ini.
                </p>
              </div>
            </div>
          )}

          {/* Description */}
          <div className="space-y-3">
            <h3 className="font-semibold">Deskripsi</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 pl-6">
              Mata kuliah ini membahas konsep dan implementasi dari {course.name.toLowerCase()}.
              Mahasiswa akan mempelajari teori dan praktek yang relevan dengan
              topik ini.
            </p>
          </div>

          {/* Learning Outcomes */}
          <div className="space-y-3">
            <h3 className="font-semibold">Capaian Pembelajaran</h3>
            <ul className="list-disc list-inside space-y-1 pl-6 text-sm text-gray-600 dark:text-gray-400">
              <li>Memahami konsep dasar dan teori</li>
              <li>Mampu mengimplementasikan solusi praktis</li>
              <li>Dapat menganalisis dan memecahkan masalah</li>
              <li>Berkolaborasi dalam tim proyek</li>
            </ul>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
