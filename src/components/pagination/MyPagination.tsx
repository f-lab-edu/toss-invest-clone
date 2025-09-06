import type { FC } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination.tsx";
import MyPaginationLinkItems from "@/components/pagination/MyPaginationLinkItems.tsx";

type MyPaginationProps = {
  currentPage: number;
  onCurrentPageChange: (page: number) => void;
  totalPages?: number;
};

const MyPagination: FC<MyPaginationProps> = ({
  currentPage,
  onCurrentPageChange,
  totalPages = 10,
}) => {
  return (
    <Pagination>
      <PaginationContent>
        <MyPaginationLinkItems
          currentPage={currentPage}
          onCurrentPageChange={onCurrentPageChange}
          totalPages={totalPages}
        />
        {totalPages > 1 && (
          <>
            <PaginationItem
              onClick={() => onCurrentPageChange(currentPage - 1)}
            >
              <PaginationPrevious
                className={`${
                  currentPage <= 1 ? "opacity-50 cursor-not-allowed" : ""
                }`}
                aria-disabled={currentPage <= 1}
              />
            </PaginationItem>
            <PaginationItem
              onClick={() => onCurrentPageChange(currentPage + 1)}
            >
              <PaginationNext
                className={`${
                  currentPage >= totalPages
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
                aria-disabled={currentPage >= totalPages}
              />
            </PaginationItem>
          </>
        )}
      </PaginationContent>
    </Pagination>
  );
};

export default MyPagination;
