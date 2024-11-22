import React from 'react';
import RatingMemberAdminCard from '@/features/mainRatingMembers/components/RatingMembersCardAdmin/RatingMemberAdminCard';
import WarningMessage from '@/components/WarningMessage/WarningMessage';
import { RatingMember } from '@/types/ratingMember';

interface Props {
  ratingMembers: RatingMember[];
  ratingMembersAll: RatingMember[];
  title: string;
  category: string;
  hasDuplicatePlaces: boolean;
}

const RatingMembersAdminList: React.FC<Props> = ({
  ratingMembers,
  ratingMembersAll,
  title,
  category,
  hasDuplicatePlaces,
}) => {
  let content: React.ReactNode = <small className='my-6'>Данные рейтинга отсутствуют</small>;

  if (ratingMembers.length > 0) {
    content = ratingMembers.map((ratingMember) => (
      <RatingMemberAdminCard key={ratingMember._id} ratingMember={ratingMember} ratingMembers={ratingMembersAll} />
    ));
  }

  return (
    <div>
      <div className='text-center'>
        <h1 className='text-[20px] sm:text-[22px] font-semibold'>{title} рейтинга</h1>
        <h1 className='text-lg text-[#64B32C] font-semibold mt-1 sm:mt-3'>{category}</h1>
      </div>
      {hasDuplicatePlaces && (
        <div className='mt-2'>
          <WarningMessage message={`Обнаружены дублирующиеся места в ${title} рейтинга. Проверьте данные.`} />
        </div>
      )}
      <div className='flex flex-col items-center gap-y-3 mt-5 sm:mt-8'>{content}</div>
    </div>
  );
};

export default RatingMembersAdminList;
