import React from 'react';
import { RatingMember } from '@/types/ratingMember';
import RatingMemberAdminCard from '@/features/mainRatingMembers/RatingMembersAdmin/components/RatingMembersCardAdmin/RatingMemberAdminCard';

interface Props {
  ratingMembers: RatingMember[];
  title: string;
  category: string;
}

const RatingMembersAdmin: React.FC<Props> = ({ ratingMembers, title, category }) => {
  let content: React.ReactNode = <small className='my-6'>Данные рейтинга отсутствуют</small>;

  if (ratingMembers.length > 0) {
    content = ratingMembers.map((ratingMember) => (
      <RatingMemberAdminCard key={ratingMember._id} ratingMember={ratingMember} />
    ));
  }

  return (
    <div>
      <div className='text-center'>
        <h1 className='text-[20px] sm:text-[22px] font-semibold'>{title} рейтинга</h1>
        <h1 className='text-lg text-[#64B32C] font-semibold mt-1 sm:mt-3'>{category}</h1>
      </div>
      <div className='flex flex-col items-center gap-y-3 mt-5 sm:mt-8'>{content}</div>
    </div>
  );
};

export default RatingMembersAdmin;
