"use client";
import { role } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
  FiHome,
  FiBook,
  FiCalendar,
  FiMessageSquare,
  FiUser,
  FiSettings,
  FiLogOut,
  FiMenu,
  FiX,
  FiClipboard,
  FiCheckSquare,
} from "react-icons/fi";
import {
  FaChalkboardTeacher,
  FaUserGraduate,
  FaUserFriends,
  FaSchool,
  FaBookOpen,
  FaClipboardList,
} from "react-icons/fa";
import { BsMegaphone } from "react-icons/bs";

const menuItems = [
  {
    title: "MENU",
    items: [
      {
        icon: <FiHome size={12} />,
        label: "Home",
        href: "/",
        visible: ["admin", "teacher", "student", "parent"],
      },
    ],
  },
  {
    title: "ACADEMICS",
    items: [
      {
        icon: <FaChalkboardTeacher size={12} />,
        label: "Teachers",
        href: "/list/teachers",
        visible: ["admin", "teacher"],
      },
      {
        icon: <FaUserGraduate size={12} />,
        label: "Students",
        href: "/list/students",
        visible: ["admin", "teacher"],
      },
      {
        icon: <FaUserFriends size={12} />,
        label: "Parents",
        href: "/list/parents",
        visible: ["admin", "teacher"],
      },
      {
        icon: <FaSchool size={12} />,
        label: "Classes",
        href: "/list/classes",
        visible: ["admin", "teacher"],
      },
      {
        icon: <FaBookOpen size={12} />,
        label: "Subjects",
        href: "/list/subjects",
        visible: ["admin"],
      },
      {
        icon: <FiBook size={12} />,
        label: "Lessons",
        href: "/list/lessons",
        visible: ["admin", "teacher"],
      },
    ],
  },
  {
    title: "EXAMS",
    items: [
      {
        icon: <FaClipboardList size={12} />,
        label: "Exams",
        href: "/list/exams",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: <FiCheckSquare size={12} />,
        label: "Assignments",
        href: "/list/assignments",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: <FiClipboard size={12} />,
        label: "Results",
        href: "/list/results",
        visible: ["admin", "teacher", "student", "parent"],
      },
    ],
  },
  {
    title: "ACTIVITIES",
    items: [
      {
        icon: <FiClipboard size={12} />,
        label: "Attendance",
        href: "/list/attendance",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: <FiCalendar size={12} />,
        label: "Events",
        href: "/list/events",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: <FiMessageSquare size={12} />,
        label: "Messages",
        href: "/list/messages",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: <BsMegaphone size={12} />,
        label: "Announcements",
        href: "/list/announcements",
        visible: ["admin", "teacher", "student", "parent"],
      },
    ],
  },
  {
    title: "ACCOUNT",
    items: [
      {
        icon: <FiUser size={12} />,
        label: "Profile",
        href: "/profile",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: <FiSettings size={12} />,
        label: "Settings",
        href: "/settings",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: <FiLogOut size={12} />,
        label: "Logout",
        href: "/logout",
        visible: ["admin", "teacher", "student", "parent"],
      },
    ],
  },
];

const Menu = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activePath, setActivePath] = useState("");

  useEffect(() => {
    const handleResize = () => {
      const isMobileView = window.innerWidth < 1024;
      setIsMobile(isMobileView);
      if (!isMobileView) setIsOpen(false);
    };

    const handlePathChange = () => {
      setActivePath(window.location.pathname);
    };

    handleResize();
    handlePathChange();

    window.addEventListener("resize", handleResize);
    window.addEventListener("popstate", handlePathChange);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("popstate", handlePathChange);
    };
  }, []);

  return (
    <>
      {/* White Hamburger Button - Mobile Only */}
      {isMobile && (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`fixed top-3 left-3 z-50 p-2 rounded-md bg-white shadow-sm hover:bg-gray-100 transition-all ${
            isOpen ? "hidden" : "block"
          }`}
          style={{
            width: "38px",
            height: "38px",
          }}
          aria-label="Menu"
        >
          <FiMenu className="h-4 w-4 mx-auto text-gray-800" />
        </button>
      )}

      {/* Menu Panel */}
      <div
        className={`fixed top-0 left-0 h-full bg-gradient-to-b from-blue-950 to-blue-900 text-white z-40 transition-all duration-300 ease-in-out
          ${
            isMobile
              ? isOpen
                ? "w-60 shadow-xl"
                : "-translate-x-full"
              : "w-44"
          }`}
      >
        <div className="flex flex-col h-full p-3">
          {/* Header */}
          <div className="flex items-center justify-between p-2 mb-2 border-b border-blue-800">
            <div className="flex items-center">
              <div className="relative w-6 h-6 mr-2">
                <Image
                  src="/CMS_logo.png"
                  alt="College Logo"
                  width={24}
                  height={24}
                  className="object-contain"
                />
              </div>
              <h1 className="text-sm font-semibold">CMS</h1>
            </div>
            {isMobile && isOpen && (
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 text-white hover:bg-blue-800 rounded"
                aria-label="Close Menu"
              >
                <FiX size={16} />
              </button>
            )}
          </div>

          {/* Menu Items with Reduced Size */}
          <div className="flex-1 overflow-y-auto py-1">
            {menuItems.map((section) => (
              <div key={section.title} className="mb-3 last:mb-0">
                <h2 className="text-[10px] font-medium text-blue-300 uppercase tracking-wider mb-2 px-2">
                  {section.title}
                </h2>
                <ul className="space-y-1">
                  {section.items.map((item) => {
                    if (item.visible.includes(role)) {
                      return (
                        <li key={item.label}>
                          <Link
                            href={item.href}
                            className={`flex items-center px-2 py-1.5 rounded text-xs transition-all
                              ${
                                activePath === item.href
                                  ? "bg-blue-800 text-white font-medium"
                                  : "text-blue-100 hover:bg-blue-700 hover:text-white"
                              }`}
                            onClick={() => {
                              setActivePath(item.href);
                              if (isMobile) setIsOpen(false);
                            }}
                          >
                            <span className="mr-2">{item.icon}</span>
                            <span className="truncate">{item.label}</span>
                          </Link>
                        </li>
                      );
                    }
                    return null;
                  })}
                </ul>
              </div>
            ))}
          </div>

          {/* User Profile */}
          <div className="p-2 border-t border-blue-800">
            <div className="flex items-center">
              <div className="w-6 h-6 rounded-full bg-blue-800 flex items-center justify-center mr-2 text-white text-xs font-medium">
                {role.charAt(0).toUpperCase()}
              </div>
              <div className="overflow-hidden">
                <p className="text-xs font-medium text-white truncate">
                  {role.charAt(0).toUpperCase() + role.slice(1)}
                </p>
                <p className="text-[10px] text-blue-300 truncate">{role}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-30 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Global Styles */}
      <style jsx global>{`
        main {
          margin-left: ${isMobile ? "0" : "14rem"};
          transition: margin-left 0.3s ease;
        }

        @media (max-width: 1023px) {
          main {
            padding-top: 3.5rem;
          }
        }

        /* Slim Scrollbar */
        .overflow-y-auto::-webkit-scrollbar {
          width: 3px;
        }
        .overflow-y-auto::-webkit-scrollbar-track {
          background: rgba(8, 28, 63, 0.2);
        }
        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: rgba(56, 103, 214, 0.5);
          border-radius: 3px;
        }
        .overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background: rgba(67, 117, 235, 0.7);
        }
      `}</style>
    </>
  );
};

export default Menu;
