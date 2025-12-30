import { useState } from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ShoppingCart, CreditCard, Calendar } from "lucide-react";
import { Course } from "./Dashboard";
import ConfirmationModal from "./ConfirmationModal";
import CalendarView from "./CalendarView";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

interface StickyFooterProps {
  totalCredits: number;
  totalCost: number;
  selectedCourses: Course[];
  isWhatIfMode: boolean;
  showCost?: boolean;
  isSidebarOpen?: boolean;
}

export default function StickyFooter({
  totalCredits,
  totalCost,
  selectedCourses,
  isWhatIfMode,
  showCost = false,
  isSidebarOpen = false,
}: StickyFooterProps) {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const maxCredits = 24;
  const isOverLimit = totalCredits > maxCredits;

  return (
    <>
      <div
        className="fixed bottom-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 shadow-lg z-30 transition-all duration-300 ease-in-out"
        style={{
          left: isSidebarOpen ? "256px" : "0px",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Left - Selected Items */}
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <div className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {selectedCourses.length} Mata Kuliah
                </span>
              </div>

              <div className="h-6 w-px bg-gray-300 dark:bg-gray-600"></div>

              <div className="flex items-center gap-2">
                <Badge
                  variant={isOverLimit ? "destructive" : "default"}
                  className={
                    !isOverLimit
                      ? "bg-blue-600 hover:bg-blue-700"
                      : ""
                  }
                >
                  {totalCredits}/{maxCredits} SKS
                </Badge>
                {isOverLimit && (
                  <span className="text-xs text-red-600 dark:text-red-400">
                    Melebihi batas!
                  </span>
                )}
              </div>

              {showCost && (
                <>
                  <div className="h-6 w-px bg-gray-300 dark:bg-gray-600"></div>

                  <div className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                    <span className="font-semibold text-gray-900 dark:text-white">
                      Rp {totalCost.toLocaleString("id-ID")}
                    </span>
                  </div>
                </>
              )}
            </div>

            {/* Right - Actions */}
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Calendar className="w-4 h-4 mr-2" />
                    Lihat Jadwal
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-full sm:max-w-xl overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle>Jadwal Mingguan</SheetTitle>
                    <SheetDescription>
                      Cek jadwal mata kuliah yang dipilih untuk menghindari bentrok
                    </SheetDescription>
                  </SheetHeader>
                  <CalendarView selectedCourses={selectedCourses} />
                </SheetContent>
              </Sheet>

              <Button
                size="sm"
                className="bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700"
                disabled={selectedCourses.length === 0 || isOverLimit}
                onClick={() => setShowConfirmation(true)}
              >
                {isWhatIfMode ? "Simpan Simulasi" : "Submit KRS"}
              </Button>
            </div>
          </div>

          {/* Warning if in What If Mode */}
          {isWhatIfMode && selectedCourses.length > 0 && (
            <div className="mt-3 text-center">
              <p className="text-xs text-amber-600 dark:text-amber-400">
                ⚠️ Mode Simulasi Aktif - Klik "Simpan Simulasi" untuk melihat
                preview
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Add padding to prevent content from being hidden behind sticky footer */}
      <div className="h-32"></div>

      <ConfirmationModal
        isOpen={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        selectedCourses={selectedCourses}
        totalCredits={totalCredits}
        totalCost={totalCost}
        isWhatIfMode={isWhatIfMode}
        showCost={showCost}
      />
    </>
  );
}