import React from 'react';
import { useAppSelector } from '@/app/hooks';
import { useNavigate } from 'react-router-dom';
import { selectNewsPagesCount } from '@/features/news/newsSlice';
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from '@/components/ui/pagination';
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger } from '@/components/ui/select';
import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon } from '@heroicons/react/16/solid';
import './customPagination.css';

interface Props {
  page: number;
  limit: number;
}

const CustomPagination: React.FC<Props> = ({ page, limit }) => {
  const navigate = useNavigate();
  const totalPages = useAppSelector(selectNewsPagesCount);
  const pageNumbers = [];

  const maxVisiblePages = 3;
  let startPage = Math.max(1, page - Math.floor(maxVisiblePages / 2));
  const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  if (endPage - startPage < maxVisiblePages - 1) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  const handlePageSelect = (selectedPage: string) => {
    navigate(`?page=${selectedPage}&limit=${limit}`);
  };

  const paginationQuery = (page: number, limit: number) => `?page=${page}&limit=${limit}`;
  const disableButton = (bound: number): React.CSSProperties => ({
    pointerEvents: page === bound ? 'none' : 'auto',
  });

  return (
    <Pagination className='py-6'>
      <PaginationContent>
        <PaginationItem className='pagination_item'>
          <a href={paginationQuery(1, limit)} className='pagination_link' style={disableButton(1)}>
            <ChevronDoubleLeftIcon />
          </a>
        </PaginationItem>
        <PaginationItem>
          <a href={paginationQuery(page - 1, limit)} className='pagination_link' style={disableButton(1)}>
            <ChevronLeftIcon />
          </a>
        </PaginationItem>

        {pageNumbers.map((pageNumber) => (
          <PaginationItem key={pageNumber} className={pageNumber !== page ? 'pagination_item border rounded-lg' : ''}>
            <PaginationLink
              href={paginationQuery(pageNumber, limit)}
              isActive={page === pageNumber}
              className={page === pageNumber ? 'pagination_link bg-[#64B32C63]' : 'hover:bg-[#64B32C63]'}
            >
              {pageNumber}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <a href={paginationQuery(page + 1, limit)} className='pagination_link' style={disableButton(totalPages)}>
            <ChevronRightIcon />
          </a>
        </PaginationItem>
        <PaginationItem className='pagination_item'>
          <a href={paginationQuery(totalPages, limit)} className='pagination_link' style={disableButton(totalPages)}>
            <ChevronDoubleRightIcon />
          </a>
        </PaginationItem>

        <Select onValueChange={handlePageSelect}>
          <SelectTrigger className='select_trigger' />
          <SelectContent>
            <SelectGroup>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                <SelectItem key={pageNum} value={pageNum.toString()}>
                  {pageNum}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </PaginationContent>
    </Pagination>
  );
};

export default CustomPagination;
