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
} from 'lucide-react';
import { AnalyticsData } from '@/types/analytics';

export const analyticsData: AnalyticsData = {
  requestStatuses: [
    { label: "Expired", value: 411, color: "bg-red-100 text-red-800", icon: XCircle },
    { label: "Completed or Closed", value: 43, color: "bg-green-100 text-green-800", icon: CheckCircle },
    { label: "Doctor Accepted", value: 93, color: "bg-blue-100 text-blue-800", icon: UserCheck },
    { label: "Pending", value: 237, color: "bg-yellow-100 text-yellow-800", icon: Clock },
    { label: "Doctor Assigned", value: 52, color: "bg-purple-100 text-purple-800", icon: Users },
    { label: "Approved", value: 22, color: "bg-emerald-100 text-emerald-800", icon: CheckCircle },
    { label: "Treatment In Progress", value: 22, color: "bg-indigo-100 text-indigo-800", icon: Activity },
    { label: "Rejected", value: 2, color: "bg-red-100 text-red-800", icon: XCircle },
    { label: "Treatment Completed", value: 20, color: "bg-green-100 text-green-800", icon: CheckCircle },
  ],
  campaigns: {
    total: 364,
    breakdown: {
      year: 362,
      halfYear: 130,
      quarter: 121,
      month: 105,
      week: 26,
      today: 1,
    },
  },
  healthRequests: {
    total: 1243,
    breakdown: {
      year: 714,
      halfYear: 454,
      quarter: 373,
      month: 244,
      week: 45,
      today: 1,
    },
  },
  total: {
    total: 1607,
    breakdown: {
      year: 1076,
      halfYear: 584,
      quarter: 494,
      month: 349,
      week: 71,
      today: 2,
    },
  },
  userTypes: [
    {
      type: "Doctors",
      total: 274,
      icon: UserCheck,
      color: "bg-blue-500",
      breakdown: { year: 202, halfYear: 91, quarter: 57, month: 32, week: 0, today: 0 },
    },
    {
      type: "Patients",
      total: 339,
      icon: Users,
      color: "bg-green-500",
      breakdown: { year: 183, halfYear: 84, quarter: 53, month: 20, week: 0, today: 0 },
    },
    {
      type: "Organizations",
      total: 49,
      icon: Building,
      color: "bg-purple-500",
      breakdown: { year: 43, halfYear: 43, quarter: 25, month: 10, week: 1, today: 0 },
    },
    {
      type: "Facilities",
      total: 227,
      icon: Hospital,
      color: "bg-orange-500",
      breakdown: { year: 215, halfYear: 110, quarter: 77, month: 44, week: 0, today: 0 },
    },
  ],
};