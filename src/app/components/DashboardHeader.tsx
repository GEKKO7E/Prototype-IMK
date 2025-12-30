import { useState } from "react";
import { Search, Bell, User, Moon, Sun } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { useTheme } from "./ThemeProvider";

export default function DashboardHeader() {
  const [openProfile, setOpenProfile] = useState(false);
  const [openNotif, setOpenNotif] = useState(false);
  const [search, setSearch] = useState("");
  const { theme, toggleTheme } = useTheme();

  const notifications = [
    { id: 1, message: "KRS Semester 5 sudah dibuka" },
    { id: 2, message: "Batas pengisian KRS: 30 September 2025" },
    { id: 3, message: "Perubahan jadwal mata kuliah PBO" },
  ];

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    console.log("Cari:", e.target.value);
    // nanti bisa disambungkan ke filter mata kuliah
  };

  return (
    <>
      {/* ================= HEADER ================= */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-blue-600 to-emerald-600 p-2 rounded-lg">
                <img
                  src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2'%3E%3Cpath d='M22 10v6M2 10l10-5 10 5-10 5z'/%3E%3Cpath d='M6 12v5c3 3 9 3 12 0v-5'/%3E%3C/svg%3E"
                  className="w-6 h-6"
                />
              </div>
              <div>
                <h1 className="font-semibold text-gray-900 dark:text-white">Portal KRS</h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Semester Ganjil 2025/2026
                </p>
              </div>
            </div>

            {/* Right */}
            <div className="flex items-center gap-4">
              {/* ===== NOTIFICATION (POPUP) ===== */}
              <Button
                variant="ghost"
                size="icon"
                className="relative"
                onClick={() => setOpenNotif(true)}
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </Button>

              {/* PROFILE DROPDOWN */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src="/mascot-avatar.png" />
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-emerald-500 text-white">
                        AS
                      </AvatarFallback>
                    </Avatar>
                    <div className="hidden md:block text-left">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        Ahmad 
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        202410370110821
                      </p>
                    </div>
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>Akun Saya</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onSelect={(e) => {
                      e.preventDefault();
                      setOpenProfile(true);
                    }}
                  >
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem>Pengaturan</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-600">
                    Keluar
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Button variant="ghost" size="icon" onClick={toggleTheme}>
                {theme === "light" ? <Moon /> : <Sun />}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* ===== POPUP NOTIFICATION ===== */}
      <Dialog open={openNotif} onOpenChange={setOpenNotif}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Notifikasi</DialogTitle>
          </DialogHeader>

          <div className="space-y-3">
            {notifications.map((n) => (
              <div
                key={n.id}
                className="p-3 rounded-lg bg-gray-100 dark:bg-gray-700 text-sm"
              >
                {n.message}
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* PROFILE POPUP TETAP (TIDAK DIUBAH) */}
      {/* ... */}
    </>
  );
}