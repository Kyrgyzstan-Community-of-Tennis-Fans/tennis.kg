import React from 'react';
import RatingMembersTop8Skeleton from '@/features/mainRatingMembers/components/RatingMembersTop/RatingMembersTop8Skeleton';
import { RatingMember } from '@/types/ratingMember';
import RatingMemberCard from '@/features/mainRatingMembers/components/RatingMemberCard/RatingMemberCard';
import RatingMembersTop3Skeleton from '@/features/mainRatingMembers/components/RatingMembersTop/RatingMembersTop3Skeleton';

interface Props {
  ratingMembers: RatingMember[];
  isFetching: boolean;
  title?: string;
  subtitle?: string;
  category: string;
  existingTitle?: boolean;
  ratingType: 'top3' | 'top8';
}

const RatingMembers: React.FC<Props> = ({
  ratingMembers,
  isFetching,
  title,
  subtitle,
  category,
  existingTitle,
  ratingType,
}) => {
  let content: React.ReactNode = <p className='text-center text-xs md:text-sm'>Данные рейтинга отсутствуют</p>;

  if (ratingMembers.length > 0) {
    content = ratingMembers.map((ratingMember) => (
      <RatingMemberCard key={ratingMember._id} ratingMember={ratingMember} />
    ));
  }

  return (
    <>
      {isFetching ? (
        ratingType === 'top3' ? (
          <RatingMembersTop3Skeleton existingTitle={existingTitle !== undefined && existingTitle} />
        ) : (
          <RatingMembersTop8Skeleton />
        )
      ) : (
        <>
          <div className='text-center'>
            {title && (
              <h1 className='text-2xl sm:text-3xl md:text-[38px] font-semibold mb-[14px] sm:mb-4 md:mb-6 lg:mb-8'>
                {title} рейтинг
              </h1>
            )}
            {ratingType === 'top3' && subtitle && (
              <h1 className='text-lg md:text-2xl font-medium mb-2 sm:mb-5 md:mb-6 lg:mb-8 text-[#000000a1] uppercase dark:text-white'>
                Топ-3 {subtitle}
              </h1>
            )}
            {ratingType === 'top8' && (
              <h1 className='text-lg md:text-2xl font-medium mb-2 sm:mb-5 md:mb-6 lg:mb-8 text-[#000000a1] uppercase dark:text-white'>
                Топ-8 участников
              </h1>
            )}
            <h1 className='text-lg md:text-[22px] font-bold text-[#64B32C]'>{category}</h1>
          </div>
          <div className='flex flex-wrap justify-center gap-x-7 gap-y-7 xs:gap-x-12 md:gap-x-16 xs:gap-y-9 mt-[34px] sm:mt-10 lg:mt-16'>
            {content}
          </div>
        </>
      )}
    </>
  );
};

export default RatingMembers;
