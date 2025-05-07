
import React from "react";
import { Button } from "@/components/ui/button";

interface PageHeaderProps {
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  actionLabel,
  onAction
}) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between pb-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">{title}</h1>
        {description && <p className="mt-1 text-sm text-gray-500">{description}</p>}
      </div>
      {actionLabel && (
        <div className="mt-4 md:mt-0">
          <Button 
            onClick={onAction} 
            className="bg-health-600 hover:bg-health-700"
          >
            {actionLabel}
          </Button>
        </div>
      )}
    </div>
  );
};

export default PageHeader;
