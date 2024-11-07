import React from 'react';
import { RatingMember } from '@/types/ratingMemberTypes';
import { Confirm } from '@/components/Confirm/Confirm';
import { Button } from '@/components/ui/button';
import { TrashIcon } from '@heroicons/react/24/outline';
import { Card } from '@/components/ui/card';
import { API_URl } from '@/consts';
import RatingWomanEdit from '@/features/mainRatingMembers/RatingMembersAdmin/components/RatingWomanEdit/RatingWomanEdit';
import RatingManEdit from '@/features/mainRatingMembers/RatingMembersAdmin/components/RatingManEdit/RatingManEdit';
import { useAdminRatingMembers } from '@/features/mainRatingMembers/hooks/useAdminRatingMembers';

interface Props {
  ratingMember: RatingMember;
}

const RatingMemberAdminCard: React.FC<Props> = ({ ratingMember }) => {
  const image = `${API_URl}/${ratingMember.image}`;
  const { handleDelete } = useAdminRatingMembers();

  return (
    <Card className='p-3 shadow-none flex-1 w-full'>
      <div className='flex items-center'>
        <img
          src={image}
          alt={ratingMember.name}
          className='
          rounded-full
          object-cover
          w-[50px] h-[50px]
        '
        />
        <h3 className='text-sm font-bold xs:text-[16px] md:text-[18px] w-9 ml-3 xs:ml-12 xs:w-12 lg:w-14'>
          № {ratingMember.place}
        </h3>
        <h3 className='text-sm font-bold xs:text-[16px] md:text-[18px] ml-4 md:ml-14 mr-3 lg:ml-12 '>
          {ratingMember.name}
        </h3>
        <div className='space-x-1 flex items-center ml-auto'>
          <Confirm onOk={() => handleDelete(ratingMember._id)}>
            <Button size='sm'>
              <TrashIcon />
            </Button>
          </Confirm>
          {ratingMember.ratingType === 'womensTop3' ? (
            <RatingWomanEdit id={ratingMember._id} existingMember={ratingMember} />
          ) : (
            <RatingManEdit id={ratingMember._id} existingMember={ratingMember} />
          )}
        </div>
      </div>
    </Card>
  );
};

export default RatingMemberAdminCard;
