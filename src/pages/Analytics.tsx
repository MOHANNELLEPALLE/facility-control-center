import React, { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import PageHeader from "@/components/dashboard/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Activity, 
  Users, 
  Hospital, 
  Building, 
  UserCheck, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  TrendingUp,
  Calendar,
  BarChart3
} from "lucide-react";

const Analytics: React.FC = () => {
  const [timeFilter, setTimeFilter] = useState("year");

  const requestStatusData = [
    { label: "Expired", value: 411, color: "bg-red-100 text-red-800", icon: XCircle },
    { label: "Completed or Closed", value: 43, color: "bg-green-100 text-green-800", icon: CheckCircle },
    { label: "Doctor Accepted", value: 93, color: "bg-blue-100 text-blue-800", icon: UserCheck },
    { label: "Pending", value: 237, color: "bg-yellow-100 text-yellow-800", icon: Clock },
    { label: "Doctor Assigned", value: 52, color: "bg-purple-100 text-purple-800", icon: Users },
    { label: "Approved", value: 22, color: "bg-emerald-100 text-emerald-800", icon: CheckCircle },
    { label: "Treatment In Progress", value: 22, color: "bg-indigo-100 text-indigo-800", icon: Activity },
    { label: "Rejected", value: 2, color: "bg-red-100 text-red-800", icon: XCircle },
    { label: "Treatment Completed", value: 20, color: "bg-green-100 text-green-800", icon: CheckCircle },
  ];

  const campaignsData = {
    total: 364,
    breakdown: {
      year: 362,
      halfYear: 130,
      quarter: 121,
      month: 105,
      week: 26,
      today: 1
    }
  };

  const healthRequestsData = {
    total: 1243,
    breakdown: {
      year: 714,
      halfYear: 454,
      quarter: 373,
      month: 244,
      week: 45,
      today: 1
    }
  };

  const totalData = {
    total: 1607,
    breakdown: {
      year: 1076,
      halfYear: 584,
      quarter: 494,
      month: 349,
      week: 71,
      today: 2
    }
  };

  const userWiseData = [
    {
      type: "Doctors",
      total: 274,
      icon: UserCheck,
      color: "bg-blue-500",
      breakdown: { year: 202, halfYear: 91, quarter: 57, month: 32, week: 0, today: 0 }
    },
    {
      type: "Patients",
      total: 339,
      icon: Users,
      color: "bg-green-500",
      breakdown: { year: 183, halfYear: 84, quarter: 53, month: 20, week: 0, today: 0 }
    },
    {
      type: "Organizations",
      total: 49,
      icon: Building,
      color: "bg-purple-500",
      breakdown: { year: 43, halfYear: 43, quarter: 25, month: 10, week: 1, today: 0 }
    },
    {
      type: "Facilities",
      total: 227,
      icon: Hospital,
      color: "bg-orange-500",
      breakdown: { year: 215, halfYear: 110, quarter: 77, month: 44, week: 0, today: 0 }
    }
  ];

  const TimeRangeCard = ({ title, total, breakdown, icon: Icon }: {
    title: string;
    total: number;
    breakdown: Record<string, number>;
    icon: React.ComponentType<{ className?: string }>;
  }) => (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Icon className="h-5 w-5 text-primary" />
            {title} ({total})
          </CardTitle>
          <Select value={timeFilter} onValueChange={setTimeFilter}>
            <SelectTrigger className="w-32 h-8">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="year">Year</SelectItem>
              <SelectItem value="halfYear">Half Year</SelectItem>
              <SelectItem value="quarter">Quarter</SelectItem>
              <SelectItem value="month">Month</SelectItem>
              <SelectItem value="week">Week</SelectItem>
              <SelectItem value="today">Today</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {Object.entries(breakdown).map(([period, value]) => (
            <div key={period} className="text-center p-3 bg-muted/30 rounded-lg">
              <div className="text-sm text-muted-foreground capitalize mb-1">
                {period === 'halfYear' ? 'Half Year' : period}
              </div>
              <div className="text-2xl font-bold text-foreground">{value}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <DashboardLayout>
      <PageHeader 
        title="Healthcare Analytics Dashboard" 
        description="Comprehensive overview of healthcare operations and metrics"
      />

      <div className="space-y-8">
        {/* Health Request Status Overview */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <BarChart3 className="h-6 w-6 text-primary" />
            <h2 className="text-xl font-semibold">Health Request Status Overview</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {requestStatusData.map((item) => {
              const IconComponent = item.icon;
              return (
                <Card key={item.label} className="hover:shadow-md transition-shadow duration-200">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-2">
                          {item.label}
                        </p>
                        <p className="text-3xl font-bold">{item.value}</p>
                      </div>
                      <div className={`p-3 rounded-full ${item.color}`}>
                        <IconComponent className="h-6 w-6" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Summary Cards */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TimeRangeCard 
            title="Campaigns" 
            total={campaignsData.total}
            breakdown={campaignsData.breakdown}
            icon={TrendingUp}
          />
          <TimeRangeCard 
            title="Health Requests" 
            total={healthRequestsData.total}
            breakdown={healthRequestsData.breakdown}
            icon={Activity}
          />
        </section>

        {/* Total Summary */}
        <section>
          <TimeRangeCard 
            title="Total" 
            total={totalData.total}
            breakdown={totalData.breakdown}
            icon={Calendar}
          />
        </section>

        {/* User-wise Summary */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <Users className="h-6 w-6 text-primary" />
            <h2 className="text-xl font-semibold">User-wise Summary</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {userWiseData.map((userData) => {
              const IconComponent = userData.icon;
              return (
                <Card key={userData.type} className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg font-semibold flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${userData.color} text-white`}>
                        <IconComponent className="h-5 w-5" />
                      </div>
                      {userData.type} ({userData.total})
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {Object.entries(userData.breakdown).map(([period, value]) => (
                        <div key={period} className="text-center p-3 bg-muted/30 rounded-lg">
                          <div className="text-sm text-muted-foreground capitalize mb-1">
                            {period === 'halfYear' ? 'Half Year' : period}
                          </div>
                          <div className="text-xl font-bold text-foreground">{value}</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
};

export default Analytics;