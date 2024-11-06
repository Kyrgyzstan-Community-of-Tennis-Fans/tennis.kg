import { Skeleton } from '@/components/ui/skeleton';

const RatingMemberCardSkeleton = () => {
  return (
    <div className='flex flex-col items-center'>
      <Skeleton
        className='
          rounded-full mb-2 sm:mb-4 lg:mb-5
          w-[87px] h-[87px]
          xs:w-28 xs:h-28
          md:w-32 md:h-32
          lg:w-44 lg:h-44
          xl:w-48 xl:h-48
        '
      />
      <div className='flex flex-col items-center'>
        <Skeleton className='h-6 md:h-8 w-12 sm:w-16 lg:w-24 mb-2 rounded-md xl:rounded-lg' />
        <Skeleton className='h-3 lg:h-5 w-12 sm:w-14 lg:w-20 rounded-sm xl:rounded-md' />
      </div>
    </div>
  );
};

export default RatingMemberCardSkeleton;
