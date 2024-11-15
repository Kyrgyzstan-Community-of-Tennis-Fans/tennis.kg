import React from 'react';
import { usePagination } from '@/lib/usePagination';
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

export const CustomPagination: React.FC<Props> = ({ page, total, setPage }) => {
  const { pageNumbers, disableButton, setPageToFirst, setPageToLast, setPageToPrevious, setPageToNext } = usePagination(
    { page, total, setPage },
  );

  return (
    <Pagination className='py-6'>
      <PaginationContent>
        <PaginationItem className='pagination-item'>
          <Button
            variant='outline'
            size='icon'
            className='hover:bg-[#64B32C63]'
            style={disableButton(1)}
            onClick={setPageToFirst}
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
            onClick={setPageToPrevious}
          >
            <ChevronLeftIcon />
          </Button>
        </PaginationItem>

        {pageNumbers.map((pageNumber) => (
          <PaginationItem key={pageNumber} className={pageNumber !== page ? 'pagination-item border rounded-lg' : ''}>
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
            onClick={setPageToNext}
          >
            <ChevronRightIcon />
          </Button>
        </PaginationItem>
        <PaginationItem className='pagination-item'>
          <Button
            variant='outline'
            size='icon'
            className='hover:bg-[#64B32C63]'
            style={disableButton(total)}
            onClick={setPageToLast}
          >
            <ChevronDoubleRightIcon />
          </Button>
        </PaginationItem>

        <Select onValueChange={(value) => setPage(Number(value))}>
          <SelectTrigger className='select-trigger' />
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
