import { useState } from "react";
import {
  GraduationCap,
  FileText,
  ChevronDown,
  ChevronRight,
  BookOpen,
  Calendar,
  ClipboardList,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import { cn } from "./ui/utils";

interface SidebarProps {
  activePage?: string;
  onNavigate?: (page: string) => void;
  isSidebarOpen?: boolean;
  onToggleSidebar?: (isOpen: boolean) => void;
}

export default function Sidebar({
  activePage = "krs",
  onNavigate,
  isSidebarOpen = true,
  onToggleSidebar,
}: SidebarProps) {
  const [expandedMenus, setExpandedMenus] = useState<string[]>(["krs"]);

  const toggleMenu = (menuId: string) => {
    setExpandedMenus((prev) =>
      prev.includes(menuId)
        ? prev.filter((id) => id !== menuId)
        : [...prev, menuId]
    );
  };

  const isExpanded = (menuId: string) => expandedMenus.includes(menuId);

  const menuItems = [
    {
      id: "hasil-studi",
      label: "Hasil Studi",
      icon: GraduationCap,
      hasSubmenu: false,
      submenu: [],
    },
    {
      id: "krs",
      label: "KRS",
      icon: FileText,
      hasSubmenu: true,
      submenu: [
        {
          id: "kurikulum",
          label: "Kurikulum",
          icon: BookOpen,
        },
        {
          id: "pemrograman-krs",
          label: "Pemrograman KRS",
          icon: ClipboardList,
        },
        {
          id: "krs-sela",
          label: "KRS Sela/Antara",
          icon: Calendar,
        },
      ],
    },
  ];

  return (
    <>
      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => onToggleSidebar?.(false)}
        />
      )}

      {/* Toggle Button - Always visible */}
      <button
        onClick={() => onToggleSidebar?.(!isSidebarOpen)}
        className="fixed top-20 left-4 z-50 bg-gradient-to-br from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white p-2.5 rounded-lg shadow-lg transition-all duration-300 hover:scale-110"
        style={{
          left: isSidebarOpen ? '260px' : '16px',
        }}
      >
        {isSidebarOpen ? <PanelLeftClose className="w-5 h-5" /> : <PanelLeftOpen className="w-5 h-5" />}
      </button>

      <aside
        className={cn(
          "fixed lg:fixed w-64 bg-slate-800 dark:bg-slate-900 h-screen border-r border-slate-700 dark:border-slate-800 transition-all duration-300 ease-in-out z-40 overflow-y-auto",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <nav className="py-4">
          {menuItems.map((item) => (
            <div key={item.id}>
              {/* Menu Parent */}
              <button
                onClick={() => {
                  if (item.hasSubmenu) {
                    toggleMenu(item.id);
                  } else {
                    onNavigate?.(item.id);
                  }
                }}
                className={cn(
                  "w-full flex items-center justify-between px-4 py-3 text-gray-200 hover:bg-slate-700 dark:hover:bg-slate-800 transition-all duration-200 border-l-4 border-transparent hover:border-emerald-500",
                  activePage === item.id && !item.hasSubmenu && "bg-emerald-600 dark:bg-emerald-700 border-emerald-500"
                )}
              >
                <div className="flex items-center gap-3">
                  <item.icon className="w-5 h-5" />
                  <span className="text-sm">{item.label}</span>
                </div>
                {item.hasSubmenu && (
                  isExpanded(item.id) ? (
                    <ChevronDown className="w-4 h-4 transition-transform duration-200" />
                  ) : (
                    <ChevronRight className="w-4 h-4 transition-transform duration-200" />
                  )
                )}
              </button>

              {/* Submenu */}
              {item.hasSubmenu && isExpanded(item.id) && item.submenu && (
                <div className="bg-slate-700 dark:bg-slate-950">
                  {item.submenu.map((subItem) => (
                    <button
                      key={subItem.id}
                      onClick={() => onNavigate?.(subItem.id)}
                      className={cn(
                        "w-full flex items-center gap-3 px-4 py-3 pl-12 text-gray-300 hover:bg-slate-600 dark:hover:bg-slate-900 transition-colors text-sm",
                        activePage === subItem.id && "bg-emerald-600 dark:bg-emerald-700 text-white"
                      )}
                    >
                      {subItem.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
}