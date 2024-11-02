import React from 'react';
import { RatingMember } from '@/types/ratingMemberTypes';
import { Loader } from '@/components/Loader/Loader';
import RatingMemberAdminCard from '@/features/mainRatingMembers/RatingMembersAdmin/components/RatingMembersCardAdmin/RatingMemberAdminCard';

interface Props {
  ratingMembers: RatingMember[];
  isFetching: boolean;
  title: string;
  category: string;
}

const RatingMembersAdmin: React.FC<Props> = ({ ratingMembers, isFetching, title, category }) => {
  let content: React.ReactNode = <small className='my-6'>Данные рейтинга отсутствуют</small>;

  if (isFetching) {
    content = <Loader fixed />;
  } else if (ratingMembers.length > 0) {
    content = ratingMembers.map((ratingMember) => (
      <RatingMemberAdminCard key={ratingMember._id} ratingMember={ratingMember} />
    ));
  }

  return (
    <div>
      <div className='text-center'>
        <h1 className='text-lg sm:text-[22px] font-semibold mb-1'>Топ-8 {title} рейтинга</h1>
        <h1 className='text-[16px] font-semibold mt-3'>{category}</h1>
      </div>
      <div className='flex flex-col items-center gap-y-3 mt-8'>{content}</div>
    </div>
  );
};

export default RatingMembersAdmin;
