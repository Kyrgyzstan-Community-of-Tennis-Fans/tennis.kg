import React from 'react';
import { RatingMember } from '@/types/ratingMemberTypes';
import { API_URl } from '@/consts';

interface Props {
  ratingMember: RatingMember;
}

const RatingMemberCard: React.FC<Props> = ({ ratingMember }) => {
  const image = `${API_URl}/${ratingMember.image}`;

  const fullName = ratingMember.name;
  const nameParts = fullName.split(' ');
  const firstName = nameParts[0];
  const lastName = nameParts.slice(1).join(' ');

  return (
    <div className='flex flex-col items-center w-[33.2%] sm:w-[25%] xl:w-[20%]'>
      <img
        src={image}
        alt={ratingMember.name}
        className='
          rounded-full mb-2 sm:mb-4 lg:mb-5
          w-[90px] h-[90px]
          xs:w-28 xs:h-28
          md:w-32 md:h-32
          lg:w-44 lg:h-44
          xl:w-48 xl:h-48
          object-cover
        '
      />
      <div className='flex flex-col text-sm text-center lg:text-lg font-semibold'>
        <p className='w-full mx-auto relative flex flex-col items-center'>
          <span className='flex-1 text-left'>{firstName}</span>
          <span className='flex-1 text-right'>{lastName}</span>
          {ratingMember.place === 1 && (
            <span className='hidden lg:block absolute left-1/2 -translate-x-1/2 bottom-[-1px] w-[49px] h-[1px] rounded-full bg-[#64B32C]' />
          )}
        </p>
        <p className='text-[#64B32C] lg:text-[#0000006e] lg:font-medium'>{ratingMember.place} место</p>
      </div>
    </div>
  );
};

export default RatingMemberCard;
