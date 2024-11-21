import React from 'react';
import RatingMemberCard from '@/features/mainRatingMembers/components/RatingMemberCard/RatingMemberCard';
import { RatingMember } from '@/types/ratingMember';
import RatingMembersTop3Skeleton from '@/features/mainRatingMembers/components/RatingMembersTop3/RatingMembersTop3Skeleton';

interface Props {
  ratingMembers: RatingMember[];
  isFetching: boolean;
  title?: string;
  subtitle: string;
  category: string;
  existingTitle: boolean;
}

const RatingMembersTop3: React.FC<Props> = ({
  ratingMembers,
  isFetching,
  title,
  subtitle,
  category,
  existingTitle,
}) => {
  let content: React.ReactNode = <small>Данные рейтинга отсутствуют</small>;

  if (ratingMembers.length > 0) {
    content = ratingMembers.map((ratingMember) => (
      <RatingMemberCard key={ratingMember._id} ratingMember={ratingMember} />
    ));
  }

  return (
    <>
      {isFetching ? (
        <RatingMembersTop3Skeleton existingTitle={existingTitle} />
      ) : (
        <>
          <div className='text-center'>
            {title && (
              <h1 className='text-2xl sm:text-3xl md:text-[38px] font-semibold mb-[14px] sm:mb-4 md:mb-6 lg:mb-8'>
                {title} рейтинг
              </h1>
            )}
            <h1 className='text-lg md:text-2xl font-medium mb-2 sm:mb-5 md:mb-6 lg:mb-8 text-[#000000a1] uppercase dark:text-white'>
              Топ-3 {subtitle}
            </h1>
            <h1 className='text-lg md:text-[22px] font-bold text-[#64B32C]'>{category}</h1>
          </div>
          <div className='flex flex-wrap items-center justify-center gap-x-7 gap-y-7 xs:gap-x-12 md:gap-x-16 xs:gap-y-9 mt-[34px] sm:mt-10 lg:mt-16'>
            {content}
          </div>
        </>
      )}
    </>
  );
};

export default RatingMembersTop3;
