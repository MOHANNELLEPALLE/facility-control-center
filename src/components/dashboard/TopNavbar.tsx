import React, { useState } from "react";
import { Bell, LogOut, Search, Settings } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { logout } from "@/store/features/authSlice";
import { useAppDispatch } from "@/store/hooks";

interface TopNavbarProps {
  toggleSidebar: () => void;
}

const TopNavbar: React.FC<TopNavbarProps> = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const handleLogout = () => {
    toast({
      title: "Logging out",
      description: "You have been logged out successfully",
    });
    dispatch(logout());
    navigate("/");
  };

  return (
    <header className="bg-white border-b border-gray-200 h-16 flex items-center px-6 sticky top-0 z-10">
      <div className="flex-1 flex">
        <div className="relative w-full max-w-lg">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="search"
            placeholder="Search..."
            className="pl-10 bg-gray-50 border-gray-200 focus:ring-health-600 focus:border-health-600"
          />
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="p-2 rounded-full hover:bg-gray-100">
              <Settings className="h-5 w-5 text-gray-500" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Settings</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate("/admin-settings")}>
              <Settings className="mr-2 h-4 w-4" />
              <span>Admin Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Avatar className="h-8 w-8 cursor-pointer">
          <AvatarFallback className="bg-primary text-primary-foreground text-sm font-medium">
            A
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
};

export default TopNavbar;
