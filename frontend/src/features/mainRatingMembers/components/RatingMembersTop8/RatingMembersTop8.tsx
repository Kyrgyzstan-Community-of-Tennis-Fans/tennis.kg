import React from 'react';
import RatingMembersTop8Skeleton from '@/features/mainRatingMembers/components/RatingMembersTop8/RatingMembersTop8Skeleton';
import { RatingMember } from '@/types/ratingMemberTypes';
import RatingMemberCard from '@/features/mainRatingMembers/components/RatingMemberCard/RatingMemberCard';

interface Props {
  ratingMembers: RatingMember[];
  isFetching: boolean;
  title: string;
  category: string;
}

const RatingMembersTop8: React.FC<Props> = ({ ratingMembers, isFetching, title, category }) => {
  return (
    <>
      {isFetching ? (
        <RatingMembersTop8Skeleton />
      ) : (
        <>
          <div className='text-center'>
            <h1 className='text-2xl sm:text-3xl md:text-[38px] font-semibold mb-[14px] sm:mb-4 md:mb-6 lg:mb-8'>
              {title} рейтинг
            </h1>
            <h1 className='text-lg md:text-2xl font-medium mb-2 sm:mb-5 md:mb-6 lg:mb-8 text-[#000000a1] uppercase'>
              Топ-8 участников
            </h1>
            <h1 className='text-lg md:text-[22px] font-bold text-[#64B32C]'>{category}</h1>
          </div>
          <div className='flex flex-wrap justify-center gap-x-7 gap-y-7 xs:gap-x-12 md:gap-x-16 xs:gap-y-9 mt-[34px] sm:mt-10 lg:mt-16'>
            {ratingMembers.map((ratingMember) => (
              <RatingMemberCard key={ratingMember._id} ratingMember={ratingMember} />
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default RatingMembersTop8;
