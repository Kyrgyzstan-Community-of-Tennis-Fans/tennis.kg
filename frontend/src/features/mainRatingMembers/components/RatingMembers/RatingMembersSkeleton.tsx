import { Skeleton } from '@/components/ui/skeleton';
import RatingMemberCardSkeleton from '@/features/mainRatingMembers/components/RatingMemberCard/RatingMemberCardSkeleton';

const RatingMembersSkeleton = () => {
  return (
    <>
      <div className='flex flex-col items-center'>
        <Skeleton className='h-8 lg:h-10 w-60 lg:w-80 rounded-md xl:rounded-lg mb-[14px] sm:mb-4 md:mb-6 lg:mb-8' />
        <Skeleton className='h-6 lg:h-8 w-52 lg:w-72 rounded-md xl:rounded-lg mb-2 sm:mb-5 md:mb-6 lg:mb-8' />
        <Skeleton className='h-5 lg:h-8 w-36 lg:w-52 rounded-md xl:rounded-lg' />
      </div>
      <div className='flex flex-wrap justify-center gap-y-7 xs:gap-y-9 mt-[34px] sm:mt-10 lg:mt-16'>
        {Array.from({ length: 8 }).map((_, index) => (
          <RatingMemberCardSkeleton key={index} />
        ))}
      </div>
    </>
  );
};

export default RatingMembersSkeleton;
