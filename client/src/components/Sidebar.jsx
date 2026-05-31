import { NavLink, useNavigate } from "react-router-dom";
import {
    LayoutDashboard,
    Users,
    Upload,
    LogOut,
    User,
} from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Sidebar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        toast.success("Logged out successfully!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
        navigate("/");
    };

    return (
        <div className="w-64 bg-slate-900 text-white flex flex-col shadow-lg h-screen">
            {/* Navigation*/}
            <nav className="flex-1 px-4 pt-6">
                <div className="space-y-1">
                    <NavLink
                        to="/dashboard"
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 ${isActive
                                ? "bg-blue-600 text-white shadow-md"
                                : "text-slate-300 hover:bg-slate-800 hover:text-white"
                            }`
                        }
                    >
                        <LayoutDashboard size={18} />
                        <span className="text-sm font-medium">Dashboard</span>
                    </NavLink>

                    <NavLink
                        to="/agents"
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 ${isActive
                                ? "bg-blue-600 text-white shadow-md"
                                : "text-slate-300 hover:bg-slate-800 hover:text-white"
                            }`
                        }
                    >
                        <Users size={18} />
                        <span className="text-sm font-medium">Agents</span>
                    </NavLink>

                    <NavLink
                        to="/upload"
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 ${isActive
                                ? "bg-blue-600 text-white shadow-md"
                                : "text-slate-300 hover:bg-slate-800 hover:text-white"
                            }`
                        }
                    >
                        <Upload size={18} />
                        <span className="text-sm font-medium">Upload CSV</span>
                    </NavLink>
                </div>
            </nav>

            {/* User Section & Logout - Moved up and simplified */}
            <div className="px-4 pb-6 pt-4 border-t border-slate-700">
                {/* Simplified profile section */}
                <div className="flex items-center gap-3 mb-4 p-2">
                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center ">
                        <User size={20} className="text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white truncate">
                            Admin User
                        </p>
                        <p className="text-xs text-slate-400 truncate">
                            admin@example.com
                        </p>
                    </div>
                </div>

                {/* Logout Button - More prominent */}
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-2 bg-red-600 px-4 py-2.5 rounded-lg hover:bg-red-700 transition-all duration-200 text-white text-sm font-medium shadow-md hover:shadow-lg"
                >
                    <LogOut size={18} />
                    <span>Logout</span>
                </button>
            </div>
        </div>
    );
}

export default Sidebar;