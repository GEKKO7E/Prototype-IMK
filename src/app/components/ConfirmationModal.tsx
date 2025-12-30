import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { Course } from "./Dashboard";
import { CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCourses: Course[];
  totalCredits: number;
  totalCost: number;
  isWhatIfMode: boolean;
  showCost?: boolean;
}

export default function ConfirmationModal({
  isOpen,
  onClose,
  selectedCourses,
  totalCredits,
  totalCost,
  isWhatIfMode,
  showCost = false,
}: ConfirmationModalProps) {
  const [agreed, setAgreed] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleConfirm = () => {
    if (!agreed) {
      toast.error("Silakan setujui syarat dan ketentuan terlebih dahulu");
      return;
    }

    // Show success state
    setShowSuccess(true);

    // Show success toast
    setTimeout(() => {
      toast.success("Sukses!", {
        description: isWhatIfMode
          ? "Simulasi KRS berhasil disimpan"
          : "KRS berhasil disubmit",
      });
      
      // Close modal after showing success
      setTimeout(() => {
        setShowSuccess(false);
        setAgreed(false);
        onClose();
      }, 1500);
    }, 500);
  };

  if (showSuccess) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md">
          <div className="flex flex-col items-center justify-center py-8">
            <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900 rounded-full flex items-center justify-center mb-4">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Sukses!
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-center">
              {isWhatIfMode
                ? "Simulasi KRS Anda telah disimpan"
                : "KRS Anda telah berhasil disubmit"}
            </p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isWhatIfMode ? "Konfirmasi Simulasi KRS" : "Konfirmasi Pengajuan KRS"}
          </DialogTitle>
          <DialogDescription>
            Mohon periksa kembali mata kuliah yang Anda pilih sebelum melanjutkan
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 my-4">
          {/* Summary */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Total Mata Kuliah:
              </span>
              <span className="font-semibold">{selectedCourses.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Total SKS:
              </span>
              <span className="font-semibold">{totalCredits} SKS</span>
            </div>
            {showCost && (
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Total Biaya:
                </span>
                <span className="font-semibold">
                  Rp {totalCost.toLocaleString("id-ID")}
                </span>
              </div>
            )}
          </div>

          {/* Course List */}
          <div className="space-y-2">
            <h4 className="font-semibold">Mata Kuliah yang Dipilih:</h4>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {selectedCourses.map((course, index) => (
                <div
                  key={course.id}
                  className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded"
                >
                  <div>
                    <p className="font-medium">
                      {index + 1}. {course.code} - {course.name}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {course.credits} SKS • {course.schedule[0].day}{" "}
                      {course.schedule[0].time}
                    </p>
                  </div>
                  {showCost && (
                    <span className="text-sm font-medium">
                      Rp {course.cost.toLocaleString("id-ID")}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <h4 className="font-semibold mb-3">Syarat dan Ketentuan:</h4>
            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1 list-disc list-inside">
              <li>Saya telah memeriksa jadwal dan tidak ada bentrok</li>
              <li>Saya telah memenuhi prasyarat mata kuliah yang dipilih</li>
              {showCost && (
                <li>
                  Saya memahami bahwa biaya kuliah harus dibayar sesuai deadline
                </li>
              )}
              <li>
                {isWhatIfMode
                  ? "Ini adalah simulasi dan dapat diubah kembali"
                  : "Setelah disubmit, perubahan hanya dapat dilakukan di periode revisi KRS"}
              </li>
            </ul>

            <div className="flex items-start gap-2 mt-4">
              <Checkbox
                id="terms"
                checked={agreed}
                onCheckedChange={(checked) => setAgreed(checked === true)}
              />
              <Label
                htmlFor="terms"
                className="text-sm cursor-pointer leading-tight"
              >
                Saya setuju dengan syarat dan ketentuan di atas
              </Label>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Batal
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={!agreed}
            className="bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700"
          >
            {isWhatIfMode ? "Simpan Simulasi" : "Konfirmasi & Submit"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}