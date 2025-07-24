
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
  Warehouse,
  Bell
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

interface NavItem {
  title: string;
  path: string;
  icon: React.ElementType;
  badge?: number;
}

interface NavCategory {
  title: string;
  icon: React.ElementType;
  items: NavItem[];
  badge?: number;
}

const navCategories: NavCategory[] = [
  {
    title: "Main",
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
    title: "Management",
    icon: Users,
    badge: 12,
    items: [
      {
        title: "Manage Users",
        path: "/users",
        icon: Users,
        badge: 3,
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
      {
        title: "Manage Organizations",
        path: "/organizations",
        icon: Warehouse,
      },
      {
        title: "Manage Requests",
        path: "/requests",
        icon: FileText,
        badge: 5,
      },
    ],
  },
  {
    title: "Settings",
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
        "bg-sidebar border-r border-sidebar-border h-screen fixed left-0 top-0 transition-all duration-300 ease-in-out z-30 flex flex-col overflow-hidden shadow-lg",
        isOpen ? "w-64" : "w-0 md:w-16"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-sidebar-border bg-sidebar/95 backdrop-blur-sm">
        <div className={cn("flex items-center", !isOpen && "md:hidden")}>
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg">
            <Hospital className="h-6 w-6 text-primary-foreground" />
          </div>
          <div className={cn("ml-3 transition-opacity duration-200", !isOpen && "hidden")}>
            <h1 className="text-lg font-bold text-sidebar-foreground">HealthAdmin</h1>
            <p className="text-xs text-sidebar-foreground/60">Admin Portal</p>
          </div>
        </div>
        <button 
          className="p-2 rounded-lg hover:bg-sidebar-accent transition-colors duration-200" 
          onClick={toggleSidebar}
        >
          {isOpen ? (
            <X size={18} className="text-sidebar-foreground/70" />
          ) : (
            <Menu size={18} className="text-sidebar-foreground/70" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 pt-6 pb-4 overflow-y-auto scrollbar-hide">
        <div className="space-y-3 px-3">
          {navCategories.map((category) => {
            const isExpanded = expandedCategories.includes(category.title);
            const hasActiveItem = category.items.some(item => item.path === location.pathname);
            
            return (
              <div key={category.title} className="space-y-1">
                {/* Category Header */}
                <button
                  onClick={() => toggleCategory(category.title)}
                  className={cn(
                    "w-full flex items-center px-3 py-2.5 text-xs font-semibold uppercase tracking-wider rounded-lg transition-all duration-200 group",
                    hasActiveItem 
                      ? "text-sidebar-primary bg-sidebar-accent/50" 
                      : "text-sidebar-foreground/60 hover:text-sidebar-primary hover:bg-sidebar-accent/30",
                    !isOpen && "justify-center md:px-3"
                  )}
                  title={!isOpen ? category.title : undefined}
                >
                  <div className="relative">
                    <category.icon className={cn(
                      "h-4 w-4 transition-colors duration-200", 
                      hasActiveItem ? "text-sidebar-primary" : "text-sidebar-foreground/60 group-hover:text-sidebar-primary"
                    )} />
                    {category.badge && !isOpen && (
                      <Badge 
                        variant="destructive" 
                        className="absolute -top-2 -right-2 h-4 w-4 p-0 text-xs flex items-center justify-center"
                      >
                        {category.badge > 9 ? '9+' : category.badge}
                      </Badge>
                    )}
                  </div>
                  {isOpen && (
                    <>
                      <span className="ml-3 truncate transition-opacity duration-200">{category.title}</span>
                      <div className="ml-auto flex items-center space-x-2">
                        {category.badge && (
                          <Badge 
                            variant="secondary" 
                            className="h-5 text-xs bg-sidebar-accent text-sidebar-foreground border-0"
                          >
                            {category.badge}
                          </Badge>
                        )}
                        <div className={cn(
                          "transition-transform duration-200",
                          isExpanded ? "rotate-90" : "rotate-0"
                        )}>
                          <ChevronRight className="h-3 w-3" />
                        </div>
                      </div>
                    </>
                  )}
                </button>

                {/* Category Items with sliding animation */}
                <div 
                  className={cn(
                    "overflow-hidden transition-all duration-300 ease-in-out",
                    (isExpanded || !isOpen) ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  )}
                >
                  <ul className={cn("space-y-1 pt-1", isOpen && "ml-2 pl-3 border-l border-sidebar-border/30")}>
                    {category.items.map((item, index) => (
                      <li 
                        key={item.path}
                        className={cn(
                          "transform transition-all duration-200",
                          (isExpanded || !isOpen) ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0"
                        )}
                        style={{ transitionDelay: `${index * 50}ms` }}
                      >
                        <Link
                          to={item.path}
                          className={cn(
                            "flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 group relative",
                            location.pathname === item.path
                              ? "bg-sidebar-primary/15 text-sidebar-primary shadow-sm border border-sidebar-primary/20"
                              : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-primary",
                            !isOpen && "justify-center md:px-3"
                          )}
                          title={!isOpen ? item.title : undefined}
                        >
                          <div className="relative">
                            <item.icon className={cn(
                              "h-4 w-4 transition-colors duration-200", 
                              location.pathname === item.path 
                                ? "text-sidebar-primary" 
                                : "text-sidebar-foreground/60 group-hover:text-sidebar-primary"
                            )} />
                            {item.badge && !isOpen && (
                              <Badge 
                                variant="destructive" 
                                className="absolute -top-2 -right-2 h-4 w-4 p-0 text-xs flex items-center justify-center"
                              >
                                {item.badge > 9 ? '9+' : item.badge}
                              </Badge>
                            )}
                          </div>
                          <span className={cn(
                            "ml-3 truncate transition-opacity duration-200", 
                            !isOpen && "hidden"
                          )}>
                            {item.title}
                          </span>
                          {item.badge && isOpen && (
                            <Badge 
                              variant="destructive" 
                              className="ml-auto h-5 text-xs"
                            >
                              {item.badge}
                            </Badge>
                          )}
                          {location.pathname === item.path && (
                            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-sidebar-primary rounded-r-full" />
                          )}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </nav>
      
      {/* User Section */}
      <div className="border-t border-sidebar-border bg-sidebar/95 backdrop-blur-sm p-4">
        <div className={cn("flex items-center", !isOpen ? "justify-center" : "space-x-3")}>
          <Avatar className="h-10 w-10 ring-2 ring-sidebar-primary/20">
            <AvatarImage src="/avatars/admin.jpg" alt="Admin" />
            <AvatarFallback className="bg-gradient-to-br from-sidebar-primary to-sidebar-primary/80 text-primary-foreground font-semibold">
              A
            </AvatarFallback>
          </Avatar>
          {isOpen && (
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-sidebar-foreground truncate">Admin User</p>
                  <p className="text-xs text-sidebar-foreground/60 truncate">admin@healthadmin.com</p>
                </div>
                <Bell className="h-4 w-4 text-sidebar-foreground/40 hover:text-sidebar-primary transition-colors cursor-pointer" />
              </div>
              <button 
                onClick={handleLogout}
                className="mt-3 w-full flex items-center justify-center px-3 py-2 text-sm text-sidebar-foreground/70 hover:text-sidebar-primary hover:bg-sidebar-accent/50 rounded-lg transition-all duration-200 group"
              >
                <LogOut className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
                <span>Sign Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
