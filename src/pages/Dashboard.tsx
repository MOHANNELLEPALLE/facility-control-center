
import React from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import PageHeader from "@/components/dashboard/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUp, ArrowDown, Users, Building, User, FileText } from "lucide-react";

const Dashboard = () => {
  return (
    <DashboardLayout>
      <PageHeader 
        title="Dashboard" 
        description="Welcome to the healthcare admin dashboard. View key metrics and manage your healthcare system."
      />
      
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mt-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">2,345</div>
              <div className="p-2 bg-green-50 rounded-full">
                <Users className="h-5 w-5 text-health-600" />
              </div>
            </div>
            <div className="flex items-center mt-2">
              <ArrowUp className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-xs font-medium text-green-500">12% increase</span>
              <span className="text-xs text-gray-500 ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Facilities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">128</div>
              <div className="p-2 bg-blue-50 rounded-full">
                <Building className="h-5 w-5 text-health-600" />
              </div>
            </div>
            <div className="flex items-center mt-2">
              <ArrowUp className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-xs font-medium text-green-500">8% increase</span>
              <span className="text-xs text-gray-500 ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Doctors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">543</div>
              <div className="p-2 bg-purple-50 rounded-full">
                <User className="h-5 w-5 text-health-600" />
              </div>
            </div>
            <div className="flex items-center mt-2">
              <ArrowUp className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-xs font-medium text-green-500">5% increase</span>
              <span className="text-xs text-gray-500 ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Pending Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">42</div>
              <div className="p-2 bg-amber-50 rounded-full">
                <FileText className="h-5 w-5 text-health-600" />
              </div>
            </div>
            <div className="flex items-center mt-2">
              <ArrowDown className="h-4 w-4 text-red-500 mr-1" />
              <span className="text-xs font-medium text-red-500">3% decrease</span>
              <span className="text-xs text-gray-500 ml-1">from last week</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4].map((_, i) => (
                <div key={i} className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                    <User className="h-5 w-5 text-gray-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">
                      {["New user registered", "Request approved", "Facility updated", "New doctor added"][i]}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {["10 minutes ago", "1 hour ago", "3 hours ago", "5 hours ago"][i]}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {["Add User", "Add Facility", "View Requests", "Add Doctor"].map((action, i) => (
                <Button 
                  key={i} 
                  variant="outline" 
                  className="justify-start h-auto py-3 text-left"
                >
                  {[<Users key="i1" />, <Building key="i2" />, <FileText key="i3" />, <User key="i4" />][i]} 
                  <span className="ml-2">{action}</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
