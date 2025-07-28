import React from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import PageHeader from "@/components/dashboard/PageHeader";
import { TrendingUp, Activity, Calendar } from "lucide-react";
import { useAnalytics } from "@/hooks/useAnalytics";
import StatusOverviewSection from "@/components/analytics/StatusOverviewSection";
import UserWiseSummarySection from "@/components/analytics/UserWiseSummarySection";
import TimeRangeCard from "@/components/analytics/TimeRangeCard";

const Analytics: React.FC = () => {
  const { timeFilter, updateTimeFilter, data } = useAnalytics();

  return (
    <DashboardLayout>
      <PageHeader 
        title="Healthcare Analytics Dashboard" 
        description="Comprehensive overview of healthcare operations and metrics"
      />

      <div className="space-y-8">
        {/* Health Request Status Overview */}
        <StatusOverviewSection statuses={data.requestStatuses} />

        {/* Summary Cards */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TimeRangeCard 
            title="Campaigns" 
            data={data.campaigns}
            icon={TrendingUp}
            timeFilter={timeFilter}
            onTimeFilterChange={updateTimeFilter}
          />
          <TimeRangeCard 
            title="Health Requests" 
            data={data.healthRequests}
            icon={Activity}
            timeFilter={timeFilter}
            onTimeFilterChange={updateTimeFilter}
          />
        </section>

        {/* Total Summary */}
        <section>
          <TimeRangeCard 
            title="Total" 
            data={data.total}
            icon={Calendar}
            timeFilter={timeFilter}
            onTimeFilterChange={updateTimeFilter}
          />
        </section>

        {/* User-wise Summary */}
        <UserWiseSummarySection userTypes={data.userTypes} />
      </div>
    </DashboardLayout>
  );
};

export default Analytics;