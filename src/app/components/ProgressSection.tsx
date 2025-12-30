import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { CheckCircle2, Circle } from "lucide-react";

export default function ProgressSection() {
  // Data untuk Donut Chart
  const creditData = [
    { name: "Lulus", value: 98, color: "#10b981" }, // emerald-500
    { name: "Sisa", value: 46, color: "#94a3b8" }, // slate-400
  ];

  const totalCredits = 144;
  const completedCredits = 98;
  const remainingCredits = 46;
  const currentSemester = 5;
  const totalSemesters = 8;

  // Data timeline semester
  const semesters = Array.from({ length: 8 }, (_, i) => ({
    number: i + 1,
    completed: i < currentSemester - 1,
    current: i === currentSemester - 1,
  }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      {/* Donut Chart - Total Credits */}
      <Card>
        <CardHeader>
          <CardTitle className="text-center">Total SKS</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center">
            <div className="w-full h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={creditData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {creditData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 text-center">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {completedCredits}/{totalCredits}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                SKS Diselesaikan
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Progress Bar - Current Semester */}
      <Card>
        <CardHeader>
          <CardTitle className="text-center">Progres Semester</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="text-center">
              <p className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
                Semester {currentSemester}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                dari {totalSemesters} Semester
              </p>
            </div>
            <Progress 
              value={(currentSemester / totalSemesters) * 100} 
              className="h-3"
            />
            <div className="flex justify-between text-sm">
              <span className="text-gray-500 dark:text-gray-400">
                {currentSemester}/{totalSemesters}
              </span>
              <span className="text-gray-500 dark:text-gray-400">
                {Math.round((currentSemester / totalSemesters) * 100)}%
              </span>
            </div>
            <div className="mt-6 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-300">SKS Semester Ini</span>
                <span className="font-semibold">18 SKS</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-300">IPK Saat Ini</span>
                <span className="font-semibold">3.65</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="text-center">Timeline Akademik</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {semesters.map((sem) => (
              <div
                key={sem.number}
                className="flex items-center gap-3"
              >
                {sem.completed ? (
                  <CheckCircle2 className="w-6 h-6 text-emerald-500 flex-shrink-0" />
                ) : sem.current ? (
                  <div className="w-6 h-6 rounded-full border-4 border-blue-500 flex-shrink-0"></div>
                ) : (
                  <Circle className="w-6 h-6 text-gray-300 dark:text-gray-600 flex-shrink-0" />
                )}
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span
                      className={`font-medium ${
                        sem.current
                          ? "text-blue-600 dark:text-blue-400"
                          : sem.completed
                          ? "text-emerald-600 dark:text-emerald-400"
                          : "text-gray-400 dark:text-gray-500"
                      }`}
                    >
                      Semester {sem.number}
                    </span>
                    {sem.current && (
                      <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-full">
                        Aktif
                      </span>
                    )}
                    {sem.completed && (
                      <span className="text-xs text-emerald-600 dark:text-emerald-400">
                        ✓ Selesai
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
