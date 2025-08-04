import React, { useEffect } from "react";
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
  totalRecords?: number; // e.g., 53
  pageSize?: number; // default 10
  scrollToTop?: boolean;
}

const PaginationBar: React.FC<PaginationBarProps> = ({
  page,
  totalPages,
  setPage,
  totalRecords,
  pageSize = 10,
  scrollToTop = true,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        setPage(Math.max(1, page - 1));
      }
      if (e.key === "ArrowLeft") {
        setPage(Math.max(1, page - 1));
      }
      if (e.key === "Enter") {
        if (scrollToTop) window.scrollTo({ top: 0, behavior: "smooth" });
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [setPage, totalPages, scrollToTop]);

  if (totalPages <= 1) return null;

  const changePage = (newPage: number) => {
    if (newPage !== page) {
      setPage(newPage);
      if (scrollToTop) window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const getPageNumbers = () => {
    const pages: (number | "...")[] = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (page > 4) pages.push("...");
      for (
        let i = Math.max(2, page - 1);
        i <= Math.min(totalPages - 1, page + 1);
        i++
      ) {
        pages.push(i);
      }
      if (page < totalPages - 3) pages.push("...");
      pages.push(totalPages);
    }

    return pages;
  };

  const start = (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, totalRecords || page * pageSize);

  return (
    <div className="py-4 px-6 border-t border-gray-200 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      {/* Total Records Display */}
      {totalRecords !== undefined && (
        <div className="text-sm text-gray-500">
          Showing <span className="font-medium">{start}</span> to{" "}
          <span className="font-medium">{end}</span> of{" "}
          <span className="font-medium">{totalRecords}</span> results
        </div>
      )}

      {/* Pagination Control */}
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={() => changePage(Math.max(1, page - 1))}
              aria-disabled={page === 1}
              className={page === 1 ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>

          {getPageNumbers().map((pg, idx) => (
            <PaginationItem key={idx}>
              {pg === "..." ? (
                <span className="px-2 text-gray-500 select-none">…</span>
              ) : (
                <PaginationLink
                  href="#"
                  isActive={page === pg}
                  className={`transition-all duration-200 ease-in-out ${
                    page === pg ? "bg-theme-primary text-white" : ""
                  }`}
                  onClick={() => changePage(pg as number)}
                >
                  {pg}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={() => changePage(Math.min(totalPages, page + 1))}
              aria-disabled={page === totalPages}
              className={
                page === totalPages ? "pointer-events-none opacity-50" : ""
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default PaginationBar;
