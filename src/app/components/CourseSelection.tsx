import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Course } from "./Dashboard";
import CourseDetailDrawer from "./CourseDetailDrawer";
import { CircleDot, Check, Search } from "lucide-react";

interface CourseSelectionProps {
  courses: Course[];
  selectedCourses: Course[];
  onToggleCourse: (course: Course) => void;
  isWhatIfMode: boolean;
  onToggleWhatIfMode: () => void;
}

export default function CourseSelection({
  courses,
  selectedCourses,
  onToggleCourse,
  isWhatIfMode,
  onToggleWhatIfMode,
}: CourseSelectionProps) {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
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
    return selectedCourses.some((c) => c.id === courseId);
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
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Pilih Mata Kuliah</CardTitle>
            <div className="flex items-center gap-2">
              <Label htmlFor="whatif-mode" className="cursor-pointer">
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
            <p className="text-sm text-amber-600 dark:text-amber-400 mt-2">
              ⚠️ Anda sedang dalam mode SIMULASI
            </p>
          )}
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <Input
              type="text"
              placeholder="Cari mata kuliah..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="mb-3"
            />
            {filteredCourses.map((course) => (
              <div
                key={course.id}
                className={`border rounded-lg p-4 transition-all ${
                  isSelected(course.id)
                    ? "border-blue-500 bg-blue-50 dark:bg-blue-950"
                    : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
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
                      <Badge variant="outline" className="text-xs">
                        Rp {course.cost.toLocaleString("id-ID")}
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
                      onClick={() => onToggleCourse(course)}
                      className={
                        isSelected(course.id)
                          ? "bg-blue-600 hover:bg-blue-700"
                          : ""
                      }
                    >
                      {isSelected(course.id) ? (
                        <>
                          <Check className="w-4 h-4 mr-1" />
                          Dipilih
                        </>
                      ) : (
                        "Ambil"
                      )}
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setSelectedCourse(course)}
                    >
                      Detail
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <CourseDetailDrawer
        course={selectedCourse}
        onClose={() => setSelectedCourse(null)}
      />
    </>
  );
}