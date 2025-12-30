import { Card, CardContent } from "./ui/card";
import { Course } from "./Dashboard";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "./ui/alert";

interface CalendarViewProps {
  selectedCourses: Course[];
}

const days = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat"];
const timeSlots = [
  "07:00-08:00",
  "08:00-09:00",
  "09:00-10:00",
  "10:00-11:00",
  "11:00-12:00",
  "12:00-13:00",
  "13:00-14:00",
  "14:00-15:00",
  "15:00-16:00",
  "16:00-17:00",
];

export default function CalendarView({ selectedCourses }: CalendarViewProps) {
  const hasConflict = () => {
    const scheduleMap = new Map<string, Course[]>();

    selectedCourses.forEach((course) => {
      course.schedule.forEach((sched) => {
        const key = `${sched.day}-${sched.time}`;
        if (!scheduleMap.has(key)) {
          scheduleMap.set(key, []);
        }
        scheduleMap.get(key)?.push(course);
      });
    });

    return Array.from(scheduleMap.values()).some((courses) => courses.length > 1);
  };

  const getCourseAtTime = (day: string, timeSlot: string) => {
    return selectedCourses.filter((course) =>
      course.schedule.some((sched) => {
        if (sched.day !== day) return false;
        
        // Simple time overlap check
        const schedTime = sched.time;
        return schedTime.includes(timeSlot.split("-")[0]);
      })
    );
  };

  return (
    <div className="mt-6 space-y-4">
      {hasConflict() && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Terdapat bentrok jadwal! Silakan periksa kembali mata kuliah yang dipilih.
          </AlertDescription>
        </Alert>
      )}

      <div className="overflow-x-auto">
        <div className="min-w-[600px]">
          {/* Header */}
          <div className="grid grid-cols-6 gap-2 mb-2">
            <div className="text-sm font-semibold text-gray-500 dark:text-gray-400">
              Waktu
            </div>
            {days.map((day) => (
              <div
                key={day}
                className="text-sm font-semibold text-center text-gray-700 dark:text-gray-300"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Time Slots */}
          <div className="space-y-1">
            {timeSlots.map((timeSlot) => (
              <div key={timeSlot} className="grid grid-cols-6 gap-2">
                <div className="text-xs text-gray-500 dark:text-gray-400 py-2">
                  {timeSlot}
                </div>
                {days.map((day) => {
                  const courses = getCourseAtTime(day, timeSlot);
                  return (
                    <div
                      key={`${day}-${timeSlot}`}
                      className={`min-h-[60px] border rounded p-1 ${
                        courses.length === 0
                          ? "bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                          : courses.length === 1
                          ? "bg-blue-100 dark:bg-blue-900 border-blue-300 dark:border-blue-700"
                          : "bg-red-100 dark:bg-red-900 border-red-300 dark:border-red-700"
                      }`}
                    >
                      {courses.map((course, idx) => (
                        <div key={idx} className="text-xs">
                          <p className="font-semibold truncate">
                            {course.code}
                          </p>
                          <p className="text-gray-600 dark:text-gray-300 truncate">
                            {course.name}
                          </p>
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded"></div>
          <span className="text-xs text-gray-600 dark:text-gray-400">Kosong</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-100 dark:bg-blue-900 border border-blue-300 dark:border-blue-700 rounded"></div>
          <span className="text-xs text-gray-600 dark:text-gray-400">Terjadwal</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-100 dark:bg-red-900 border border-red-300 dark:border-red-700 rounded"></div>
          <span className="text-xs text-gray-600 dark:text-gray-400">Bentrok</span>
        </div>
      </div>
    </div>
  );
}
