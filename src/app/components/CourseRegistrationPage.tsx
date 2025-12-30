import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Course } from "./Dashboard";
import CourseDetailDrawer from "./CourseDetailDrawer";
import ClassSelectionModal from "./ClassSelectionModal";
import SelectedCoursesTable from "./SelectedCoursesTable";
import { Plus, Info, Search } from "lucide-react";

interface CourseRegistrationPageProps {
  courses: Course[];
  isWhatIfMode: boolean;
  onToggleWhatIfMode: () => void;
  selectedCoursesWithClass: Array<{ course: Course; classCode: string }>;
  onUpdateSelectedCourses: (
    courses: Array<{ course: Course; classCode: string }>
  ) => void;
}

export default function CourseRegistrationPage({
  courses,
  isWhatIfMode,
  onToggleWhatIfMode,
  selectedCoursesWithClass,
  onUpdateSelectedCourses,
}: CourseRegistrationPageProps) {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [courseForClassSelection, setCourseForClassSelection] =
    useState<Course | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-emerald-500";
      case "medium":
        return "bg-amber-500";
      case "hard":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "Mudah";
      case "medium":
        return "Sedang";
      case "hard":
        return "Sulit";
      default:
        return difficulty;
    }
  };

  const isSelected = (courseId: string) => {
    return selectedCoursesWithClass.some((item) => item.course.id === courseId);
  };

  const handleSelectCourse = (course: Course) => {
    setCourseForClassSelection(course);
    setIsModalOpen(true);
  };

  const handleSelectClass = (classCode: string) => {
    if (courseForClassSelection) {
      onUpdateSelectedCourses([
        ...selectedCoursesWithClass,
        { course: courseForClassSelection, classCode },
      ]);
    }
  };

  const handleRemoveCourse = (courseId: string) => {
    onUpdateSelectedCourses(
      selectedCoursesWithClass.filter((item) => item.course.id !== courseId)
    );
  };

  const filteredCourses = courses.filter((course) =>
    course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.schedule.some(s => 
      s.day.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.time.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <>
      <div className="space-y-6">
        {/* Selected Courses Table */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl text-gray-900 dark:text-white">
              Mata Kuliah Terpilih
            </h2>
            <div className="flex items-center gap-2">
              <Label htmlFor="whatif-mode" className="cursor-pointer text-sm">
                {isWhatIfMode ? "Mode Simulasi" : "Mode Aktual"}
              </Label>
              <Switch
                id="whatif-mode"
                checked={isWhatIfMode}
                onCheckedChange={onToggleWhatIfMode}
              />
            </div>
          </div>

          {isWhatIfMode && (
            <div className="mb-4 p-3 bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-lg">
              <p className="text-sm text-amber-800 dark:text-amber-200">
                ⚠️ Anda sedang dalam mode SIMULASI. Perubahan tidak akan disimpan.
              </p>
            </div>
          )}

          <SelectedCoursesTable
            selectedCourses={selectedCoursesWithClass}
            onRemoveCourse={handleRemoveCourse}
          />
        </div>

        {/* Available Courses */}
        <Card>
          <CardHeader>
            <CardTitle>Daftar Mata Kuliah Tersedia</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Input
                type="text"
                placeholder="Cari mata kuliah..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="mb-4"
              />
              {filteredCourses.map((course) => (
                <div
                  key={course.id}
                  className={`border rounded-lg p-4 transition-all ${
                    isSelected(course.id)
                      ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950 opacity-60"
                      : "border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-md"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        {/* Traffic Light Indicator */}
                        <div
                          className={`w-3 h-3 rounded-full ${getDifficultyColor(
                            course.difficulty
                          )}`}
                          title={getDifficultyLabel(course.difficulty)}
                        ></div>
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white">
                            {course.code}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            {course.name}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mt-3">
                        <Badge variant="outline" className="text-xs">
                          {course.credits} SKS
                        </Badge>
                        <Badge
                          variant="outline"
                          className={`text-xs ${
                            course.difficulty === "easy"
                              ? "border-emerald-500 text-emerald-700 dark:text-emerald-400"
                              : course.difficulty === "medium"
                              ? "border-amber-500 text-amber-700 dark:text-amber-400"
                              : "border-red-500 text-red-700 dark:text-red-400"
                          }`}
                        >
                          {getDifficultyLabel(course.difficulty)}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {course.schedule[0].day} {course.schedule[0].time}
                        </Badge>
                      </div>

                      {course.prerequisites.length > 0 && (
                        <div className="mt-2">
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            Prasyarat: {course.prerequisites.join(", ")}
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col gap-2">
                      <Button
                        size="sm"
                        variant={isSelected(course.id) ? "default" : "outline"}
                        onClick={() => handleSelectCourse(course)}
                        disabled={isSelected(course.id)}
                        className={
                          isSelected(course.id)
                            ? "bg-emerald-600 hover:bg-emerald-700"
                            : "hover:bg-blue-50 dark:hover:bg-blue-950"
                        }
                      >
                        {isSelected(course.id) ? (
                          "Terpilih"
                        ) : (
                          <>
                            <Plus className="w-4 h-4 mr-1" />
                            Pilih Kelas
                          </>
                        )}
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setSelectedCourse(course)}
                        className="hover:bg-gray-100 dark:hover:bg-gray-800"
                      >
                        <Info className="w-4 h-4 mr-1" />
                        Detail
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Modals */}
      <ClassSelectionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        course={courseForClassSelection}
        onSelectClass={handleSelectClass}
      />

      <CourseDetailDrawer
        course={selectedCourse}
        onClose={() => setSelectedCourse(null)}
      />
    </>
  );
}