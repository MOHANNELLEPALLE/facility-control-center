import { LucideIcon } from 'lucide-react';

export interface RequestStatus {
  label: string;
  value: number;
  color: string;
  icon: LucideIcon;
}

export interface TimeBreakdown {
  year: number;
  halfYear: number;
  quarter: number;
  month: number;
  week: number;
  today: number;
}

export interface SummaryData {
  total: number;
  breakdown: TimeBreakdown;
}

export interface UserTypeData {
  type: string;
  total: number;
  icon: LucideIcon;
  color: string;
  breakdown: TimeBreakdown;
}

export type TimeFilterType = keyof TimeBreakdown;

export interface AnalyticsData {
  requestStatuses: RequestStatus[];
  campaigns: SummaryData;
  healthRequests: SummaryData;
  total: SummaryData;
  userTypes: UserTypeData[];
}