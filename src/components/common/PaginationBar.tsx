import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginationBarProps {
  page: number;
  totalPages: number;
  setPage: (page: number) => void;
}

const PaginationBar: React.FC<PaginationBarProps> = ({
  page,
  totalPages,
  setPage,
}) => {
  if (totalPages <= 1) return null;

  return (
    <div className="py-4 px-6 border-t border-gray-200">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={() => setPage(Math.max(1, page - 1))}
              aria-disabled={page === 1}
            />
          </PaginationItem>
          {[...Array(totalPages)].map((_, i) => (
            <PaginationItem key={i}>
              <PaginationLink
                href="#"
                isActive={page === i + 1}
                className={page === i + 1 ? "bg-theme-primary text-white" : ""}
                onClick={() => setPage(i + 1)}
              >
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={() => setPage(Math.min(totalPages, page + 1))}
              aria-disabled={page === totalPages}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default PaginationBar;
