import { useState } from "react";
import DashboardHeader from "./DashboardHeader";
import Sidebar from "./Sidebar";
import ProgressSection from "./ProgressSection";
import CourseSelection from "./CourseSelection";
import CourseRegistrationPage from "./CourseRegistrationPage";
import CurriculumTable from "./CurriculumTable";
import StickyFooter from "./StickyFooter";
import { Alert, AlertDescription } from "./ui/alert";
import { AlertCircle } from "lucide-react";

export interface Course {
  id: string;
  code: string;
  name: string;
  credits: number;
  difficulty: "easy" | "medium" | "hard";
  prerequisites: string[];
  schedule: {
    day: string;
    time: string;
  }[];
  cost: number;
}

export const availableCourses: Course[] = [
  {
    id: "1",
    code: "IF-101",
    name: "Algoritma dan Pemrograman",
    credits: 3,
    difficulty: "easy",
    prerequisites: [],
    schedule: [{ day: "Senin", time: "08:00-10:30" }],
    cost: 450000,
  },
  {
    id: "2",
    code: "IF-102",
    name: "Basis Data",
    credits: 4,
    difficulty: "medium",
    prerequisites: ["IF-101"],
    schedule: [{ day: "Selasa", time: "10:00-12:30" }],
    cost: 600000,
  },
  {
    id: "3",
    code: "IF-201",
    name: "Struktur Data",
    credits: 3,
    difficulty: "medium",
    prerequisites: ["IF-101"],
    schedule: [{ day: "Rabu", time: "08:00-10:30" }],
    cost: 450000,
  },
  {
    id: "4",
    code: "IF-202",
    name: "Pemrograman Web",
    credits: 3,
    difficulty: "easy",
    prerequisites: ["IF-101"],
    schedule: [{ day: "Kamis", time: "13:00-15:30" }],
    cost: 450000,
  },
  {
    id: "5",
    code: "IF-301",
    name: "Kecerdasan Buatan",
    credits: 4,
    difficulty: "hard",
    prerequisites: ["IF-101", "IF-201"],
    schedule: [{ day: "Jumat", time: "08:00-11:00" }],
    cost: 600000,
  },
  {
    id: "6",
    code: "IF-302",
    name: "Sistem Operasi",
    credits: 3,
    difficulty: "hard",
    prerequisites: ["IF-201"],
    schedule: [{ day: "Senin", time: "13:00-15:30" }],
    cost: 450000,
  },
  {
    id: "7",
    code: "IF-303",
    name: "Jaringan Komputer",
    credits: 3,
    difficulty: "medium",
    prerequisites: ["IF-102"],
    schedule: [{ day: "Selasa", time: "13:00-15:30" }],
    cost: 450000,
  },
  {
    id: "8",
    code: "IF-304",
    name: "Rekayasa Perangkat Lunak",
    credits: 4,
    difficulty: "medium",
    prerequisites: ["IF-102", "IF-201"],
    schedule: [{ day: "Rabu", time: "13:00-16:00" }],
    cost: 600000,
  },
];

export default function Dashboard() {
  const [selectedCourses, setSelectedCourses] = useState<Course[]>([]);
  const [selectedCoursesWithClass, setSelectedCoursesWithClass] = useState<
    Array<{ course: Course; classCode: string }>
  >([]);
  const [isWhatIfMode, setIsWhatIfMode] = useState(false);
  const [activePage, setActivePage] = useState("pemrograman-krs");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleToggleCourse = (course: Course) => {
    setSelectedCourses((prev) => {
      const exists = prev.some((c) => c.id === course.id);
      return exists ? prev.filter((c) => c.id !== course.id) : [...prev, course];
    });
  };

  // Total for KRS Sela/Antara
  const totalCredits = selectedCourses.reduce(
    (sum, course) => sum + course.credits,
    0
  );

  const totalCost = selectedCourses.reduce(
    (sum, course) => sum + course.cost,
    0
  );

  // Total for Pemrograman KRS
  const totalCreditsProgramming = selectedCoursesWithClass.reduce(
    (sum, item) => sum + item.course.credits,
    0
  );

  const selectedCoursesForProgramming = selectedCoursesWithClass.map(
    (item) => item.course
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <DashboardHeader />

      <div className="flex relative">
        <Sidebar
          activePage={activePage}
          onNavigate={setActivePage}
          isSidebarOpen={isSidebarOpen}
          onToggleSidebar={setIsSidebarOpen}
        />

        <main
          className="flex-1 transition-all duration-300 ease-in-out"
          style={{
            marginLeft: isSidebarOpen ? "256px" : "0px",
          }}
        >
          {/* Halaman: Hasil Studi */}
          {activePage === "hasil-studi" && (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <ProgressSection />
            </div>
          )}

          {/* Halaman: Kurikulum */}
          {activePage === "kurikulum" && <CurriculumTable />}

          {/* Halaman: Pemrograman KRS */}
          {activePage === "pemrograman-krs" && (
            <>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
                <Alert className="bg-amber-50 border-amber-200 dark:bg-amber-950 dark:border-amber-800">
                  <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                  <AlertDescription className="text-amber-800 dark:text-amber-200">
                    Batas waktu pengisian KRS: 31 Desember 2025, 23:59 WIB
                  </AlertDescription>
                </Alert>
              </div>

              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <CourseRegistrationPage
                  courses={availableCourses}
                  isWhatIfMode={isWhatIfMode}
                  onToggleWhatIfMode={() => setIsWhatIfMode((prev) => !prev)}
                  selectedCoursesWithClass={selectedCoursesWithClass}
                  onUpdateSelectedCourses={setSelectedCoursesWithClass}
                />
              </div>
            </>
          )}

          {/* Halaman: KRS Sela/Antara */}
          {activePage === "krs-sela" && (
            <>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
                <Alert className="bg-amber-50 border-amber-200 dark:bg-amber-950 dark:border-amber-800">
                  <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                  <AlertDescription className="text-amber-800 dark:text-amber-200">
                    Batas waktu pengisian KRS: 31 Desember 2025, 23:59 WIB
                  </AlertDescription>
                </Alert>
              </div>

              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <CourseSelection
                  courses={availableCourses}
                  selectedCourses={selectedCourses}
                  onToggleCourse={handleToggleCourse}
                  isWhatIfMode={isWhatIfMode}
                  onToggleWhatIfMode={() =>
                    setIsWhatIfMode((prev) => !prev)
                  }
                />
              </div>
            </>
          )}

          {/* Halaman lain (placeholder) */}
          {activePage !== "pemrograman-krs" && activePage !== "hasil-studi" && activePage !== "krs-sela" && activePage !== "kurikulum" && (
            <div className="flex items-center justify-center h-[70vh] text-gray-500 dark:text-gray-400">
              <div className="text-center">
                <p className="text-lg">Halaman "{activePage}" sedang dalam pengembangan</p>
                <p className="text-sm mt-2">Pilih menu lain di sidebar</p>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Footer untuk Pemrograman KRS - tanpa biaya */}
      {activePage === "pemrograman-krs" && (
        <StickyFooter
          totalCredits={totalCreditsProgramming}
          totalCost={0}
          selectedCourses={selectedCoursesForProgramming}
          isWhatIfMode={isWhatIfMode}
          showCost={false}
          isSidebarOpen={isSidebarOpen}
        />
      )}

      {/* Footer untuk KRS Sela/Antara - dengan biaya */}
      {activePage === "krs-sela" && (
        <StickyFooter
          totalCredits={totalCredits}
          totalCost={totalCost}
          selectedCourses={selectedCourses}
          isWhatIfMode={isWhatIfMode}
          showCost={true}
          isSidebarOpen={isSidebarOpen}
        />
      )}
    </div>
  );
}