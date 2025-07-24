
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { 
  FileText, 
  Upload, 
  Users, 
  Building, 
  User, 
  Hospital,
  Filter,
  Menu,
  X,
  LogOut,
  LayoutDashboard,
  ChevronDown,
  ChevronRight,
  Settings,
  UserPlus,
  UserCog,
  Warehouse
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

interface NavItem {
  title: string;
  path: string;
  icon: React.ElementType;
}

interface NavCategory {
  title: string;
  icon: React.ElementType;
  items: NavItem[];
}

const navCategories: NavCategory[] = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    items: [
      {
        title: "Dashboard",
        path: "/dashboard",
        icon: LayoutDashboard,
      },
    ],
  },
  {
    title: "User Management",
    icon: Users,
    items: [
      {
        title: "Manage Users",
        path: "/users",
        icon: Users,
      },
      {
        title: "Manage Doctors",
        path: "/doctors",
        icon: UserCog,
      },
      {
        title: "Add Doctors",
        path: "/add-doctor",
        icon: UserPlus,
      },
      {
        title: "Bulk Upload Users",
        path: "/bulk-upload-users",
        icon: Upload,
      },
    ],
  },
  {
    title: "Facility Management",
    icon: Building,
    items: [
      {
        title: "Manage Facilities",
        path: "/facilities",
        icon: Building,
      },
      {
        title: "Add Hospitals",
        path: "/add-hospital",
        icon: Hospital,
      },
      {
        title: "Bulk Upload Facilities",
        path: "/bulk-upload-facilities",
        icon: Upload,
      },
    ],
  },
  {
    title: "Organization Management",
    icon: Warehouse,
    items: [
      {
        title: "Manage Organizations",
        path: "/organizations",
        icon: Building,
      },
    ],
  },
  {
    title: "Request Management",
    icon: FileText,
    items: [
      {
        title: "Manage Requests",
        path: "/requests",
        icon: FileText,
      },
    ],
  },
  {
    title: "System Configuration",
    icon: Settings,
    items: [
      {
        title: "Manage Specialities",
        path: "/specialities",
        icon: Filter,
      },
      {
        title: "Manage Facility Services",
        path: "/facility-services",
        icon: Filter,
      },
    ],
  },
];

const DashboardSidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [expandedCategories, setExpandedCategories] = useState<string[]>(() => {
    // Auto-expand categories that contain the current route
    return navCategories
      .filter(category => category.items.some(item => item.path === location.pathname))
      .map(category => category.title);
  });

  const toggleCategory = (categoryTitle: string) => {
    setExpandedCategories(prev => 
      prev.includes(categoryTitle)
        ? prev.filter(title => title !== categoryTitle)
        : [...prev, categoryTitle]
    );
  };

  const handleLogout = () => {
    toast({
      title: "Logging out",
      description: "You have been logged out successfully",
    });
    // In a real app, handle actual logout logic here
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  return (
    <aside
      className={cn(
        "bg-white border-r border-gray-200 h-screen fixed left-0 top-0 transition-all duration-300 ease-in-out z-30 flex flex-col overflow-hidden",
        isOpen ? "w-64" : "w-0 md:w-16"
      )}
    >
      <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
        <div className={cn("flex items-center", !isOpen && "md:hidden")}>
          <div className="h-8 w-8 rounded-md bg-health-600 flex items-center justify-center">
            <Hospital className="h-5 w-5 text-white" />
          </div>
          <h1 className={cn("ml-2 text-lg font-semibold text-gray-800", !isOpen && "hidden")}>
            HealthAdmin
          </h1>
        </div>
        <button className="p-1 rounded-md hover:bg-gray-100" onClick={toggleSidebar}>
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <nav className="flex-1 pt-2 pb-4 overflow-y-auto">
        <div className="space-y-2 px-2">
          {navCategories.map((category) => {
            const isExpanded = expandedCategories.includes(category.title);
            const hasActiveItem = category.items.some(item => item.path === location.pathname);
            
            return (
              <div key={category.title} className="space-y-1">
                {/* Category Header */}
                <button
                  onClick={() => toggleCategory(category.title)}
                  className={cn(
                    "w-full flex items-center px-2 py-2 text-xs font-semibold uppercase tracking-wider rounded-md transition-colors",
                    hasActiveItem ? "text-primary" : "text-muted-foreground hover:text-primary",
                    !isOpen && "justify-center md:px-3"
                  )}
                  title={!isOpen ? category.title : undefined}
                >
                  <category.icon className={cn("h-4 w-4", hasActiveItem ? "text-primary" : "text-muted-foreground")} />
                  {isOpen && (
                    <>
                      <span className="ml-2 truncate">{category.title}</span>
                      <div className="ml-auto">
                        {isExpanded ? (
                          <ChevronDown className="h-3 w-3" />
                        ) : (
                          <ChevronRight className="h-3 w-3" />
                        )}
                      </div>
                    </>
                  )}
                </button>

                {/* Category Items */}
                {(isExpanded || !isOpen) && (
                  <ul className={cn("space-y-1", isOpen && "ml-3")}>
                    {category.items.map((item) => (
                      <li key={item.path}>
                        <Link
                          to={item.path}
                          className={cn(
                            "flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors",
                            location.pathname === item.path
                              ? "bg-primary/10 text-primary"
                              : "text-muted-foreground hover:bg-muted hover:text-primary",
                            !isOpen && "justify-center md:px-3"
                          )}
                          title={!isOpen ? item.title : undefined}
                        >
                          <item.icon className={cn("h-4 w-4", location.pathname === item.path ? "text-primary" : "text-muted-foreground")} />
                          <span className={cn("ml-3 truncate", !isOpen && "hidden")}>{item.title}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </div>
      </nav>
      
      <div className="border-t border-gray-200 p-4">
        <div className={cn("flex flex-col", !isOpen && "items-center")}>
          <div className="flex-shrink-0">
            <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
              <User className="h-4 w-4 text-gray-600" />
            </div>
          </div>
          {isOpen && (
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-700">Admin User</p>
              <p className="text-xs text-gray-500">admin@example.com</p>
            </div>
          )}
          <button 
            onClick={handleLogout}
            className={cn(
              "mt-3 flex items-center text-sm text-gray-600 hover:text-health-600",
              !isOpen && "justify-center"
            )}
          >
            <LogOut className="h-4 w-4" />
            <span className={cn("ml-2", !isOpen && "hidden")}>Logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
