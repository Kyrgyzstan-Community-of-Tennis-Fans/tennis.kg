import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import RatingMemberCardSkeleton from '@/features/mainRatingMembers/components/RatingMemberCard/RatingMemberCardSkeleton';

interface Props {
  existingTitle: boolean;
}

const RatingMembersTop3Skeleton: React.FC<Props> = ({ existingTitle }) => {
  return (
    <>
      <div className='flex flex-col items-center gap-y-3'>
        {existingTitle && <Skeleton className='h-8 lg:h-10 w-60 lg:w-80 rounded-md xl:rounded-lg' />}
        <Skeleton className='h-6 lg:h-8 w-52 lg:w-72 rounded-md xl:rounded-lg' />
        <Skeleton className='h-5 lg:h-8 w-36 lg:w-52 rounded-md xl:rounded-lg' />
      </div>
      <div className='flex flex-wrap items-center justify-center gap-x-7 gap-y-7 xs:gap-x-12 md:gap-x-16 xs:gap-y-9 mt-8 sm:mt-10 lg:mt-16'>
        {Array.from({ length: 3 }).map((_, index) => (
          <RatingMemberCardSkeleton key={index} />
        ))}
      </div>
    </>
  );
};

export default RatingMembersTop3Skeleton;
