import React from 'react';
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from '@/components/ui/pagination';
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger } from '@/components/ui/select';
import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon } from '@heroicons/react/16/solid';
import './customPagination.css';
import { Button } from '@/components/ui/button';

interface Props {
  page: number;
  setPage: (page: number) => void;
  total: number;
}

const CustomPagination: React.FC<Props> = ({ page, total, setPage }) => {
  const pageNumbers = [];

  const maxVisiblePages = 3;
  let startPage = Math.max(1, page - Math.floor(maxVisiblePages / 2));
  const endPage = Math.min(total, startPage + maxVisiblePages - 1);

  if (endPage - startPage < maxVisiblePages - 1) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }
  const disableButton = (bound: number): React.CSSProperties => ({
    pointerEvents: page === bound ? 'none' : 'auto',
  });

  return (
    <Pagination className='py-6'>
      <PaginationContent>
        <PaginationItem className='pagination_item'>
          <Button
            variant='outline'
            size='icon'
            className='hover:bg-[#64B32C63]'
            style={disableButton(1)}
            onClick={() => setPage(1)}
          >
            <ChevronDoubleLeftIcon />
          </Button>
        </PaginationItem>
        <PaginationItem>
          <Button
            variant='outline'
            size='icon'
            className='hover:bg-[#64B32C63]'
            style={disableButton(1)}
            onClick={() => setPage(page - 1)}
          >
            <ChevronLeftIcon />
          </Button>
        </PaginationItem>

        {pageNumbers.map((pageNumber) => (
          <PaginationItem key={pageNumber} className={pageNumber !== page ? 'pagination_item border rounded-lg' : ''}>
            <PaginationLink
              isActive={page === pageNumber}
              className={'cursor-pointer hover:bg-[#64B32C63] ' + (page === pageNumber ? 'bg-[#64B32C63]' : '')}
              onClick={() => setPage(pageNumber)}
            >
              {pageNumber}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <Button
            variant='outline'
            size='icon'
            className='hover:bg-[#64B32C63]'
            style={disableButton(total)}
            onClick={() => setPage(page + 1)}
          >
            <ChevronRightIcon />
          </Button>
        </PaginationItem>
        <PaginationItem className='pagination_item'>
          <Button
            variant='outline'
            size='icon'
            className='hover:bg-[#64B32C63]'
            style={disableButton(total)}
            onClick={() => setPage(total)}
          >
            <ChevronDoubleRightIcon />
          </Button>
        </PaginationItem>

        <Select onValueChange={(value) => setPage(Number(value))}>
          <SelectTrigger className='select_trigger' />
          <SelectContent>
            <SelectGroup>
              {Array.from({ length: total }, (_, i) => i + 1).map((pageNum) => (
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
