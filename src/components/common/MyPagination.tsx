import type { FC } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination.tsx";
import { rangeInclusive, range } from "@/lib/utils.ts";

type MyPaginationProps = {
  currentPage: number;
  onChangeCurrentPage: (page: number) => void;
  totalPages?: number;
};

const MyPagination: FC<MyPaginationProps> = ({
  currentPage,
  onChangeCurrentPage,
  totalPages = 10,
}) => {
  const MyPaginationLinkItems = () => {
    if (totalPages <= 6) {
      // 총 페이지가 6 이하일 때: 모든 페이지 표시
      return (
        <>
          {range(totalPages).map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                isActive={page === currentPage}
                onClick={() => onChangeCurrentPage(page)}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}
        </>
      );
    } else if (currentPage < 5) {
      // 현재 페이지가 앞쪽에 있을 때: 1,2,3,4,5 ... 마지막
      return (
        <>
          {range(5).map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                isActive={page === currentPage}
                onClick={() => onChangeCurrentPage(page)}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink onClick={() => onChangeCurrentPage(totalPages)}>
              {totalPages}
            </PaginationLink>
          </PaginationItem>
        </>
      );
    } else if (currentPage >= totalPages - 3) {
      // 현재 페이지가 뒤쪽에 있을 때: 1 ... 뒤에서 5개
      return (
        <>
          <PaginationItem onClick={() => onChangeCurrentPage(1)}>
            <PaginationLink>1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          {rangeInclusive(totalPages - 4, totalPages).map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                isActive={page === currentPage}
                onClick={() => onChangeCurrentPage(page)}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}
        </>
      );
    }
    // 현재 페이지가 중간에 있을 때: 1 ... 현재-1, 현재, 현재+1 ... 마지막
    return (
      <>
        <PaginationItem onClick={() => onChangeCurrentPage(1)}>
          <PaginationLink>1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        {rangeInclusive(currentPage - 1, currentPage + 1).map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              isActive={page === currentPage}
              onClick={() => onChangeCurrentPage(page)}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink onClick={() => onChangeCurrentPage(totalPages)}>
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      </>
    );
  };

  return (
    <Pagination>
      <PaginationContent>
        <MyPaginationLinkItems />
        {totalPages > 1 && (
          <>
            <PaginationItem
              onClick={() => onChangeCurrentPage(currentPage - 1)}
            >
              <PaginationPrevious
                className={`${
                  currentPage <= 1 ? "opacity-50 cursor-not-allowed" : ""
                }`}
                aria-disabled={currentPage <= 1}
              />
            </PaginationItem>
            <PaginationItem
              onClick={() => onChangeCurrentPage(currentPage + 1)}
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
