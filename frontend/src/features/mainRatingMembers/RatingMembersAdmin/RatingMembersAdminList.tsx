import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { selectRatingMembers, selectRatingMembersFetching } from '@/features/mainRatingMembers/ratingMembersSlice';
import { useEffect } from 'react';
import { fetchRatingMembers } from '@/features/mainRatingMembers/ratingMembersThunks';
import RatingMembersAdmin from '@/features/mainRatingMembers/RatingMembersAdmin/components/RatingMembersAdmin/RatingMembersAdmin';
import RatingMemberNew from '@/features/mainRatingMembers/RatingMembersAdmin/components/RatingMemberNew/RatingMemberNew';
import RatingMembersCategoriesEdit from '@/features/mainRatingMembers/RatingMembersAdmin/components/RatingMemberCategoriesEdit/RatingMembersCategoriesEdit';

const RatingMembersAdminList = () => {
  const dispatch = useAppDispatch();
  const isFetching = useAppSelector(selectRatingMembersFetching);
  const ratingMembers = useAppSelector(selectRatingMembers);

  const ratingMenMembers = ratingMembers.filter((ratingMember) => ratingMember.gender === 'male');
  const ratingWomenMembers = ratingMembers.filter((ratingMember) => ratingMember.gender === 'female');

  const hasMenMember = ratingMenMembers.length > 0;
  const hasWomenMember = ratingWomenMembers.length > 0;

  useEffect(() => {
    dispatch(fetchRatingMembers());
  }, [dispatch]);

  return (
    <div className='lg:max-w-[900px] lg:mx-auto mb-7 mt-8'>
      <div className='text-right mb-3'>
        {hasMenMember && hasWomenMember ? (
          <RatingMembersCategoriesEdit
            existingMensCategory={ratingMenMembers[0]?.mensRatingCategory || ''}
            existingWomensCategory={ratingWomenMembers[0]?.womensRatingCategory || ''}
          />
        ) : (
          <p className='text-red-500'>
            Для редактирования категорий добавьте хотя бы одного мужского и женского участника
          </p>
        )}
      </div>
      <div className='flex flex-col gap-14 '>
        <div className='w-full'>
          <div className='text-right mb-3'>
            <RatingMemberNew />
          </div>
          <RatingMembersAdmin
            ratingMembers={ratingMenMembers}
            title='мужского'
            category={ratingMenMembers[0]?.mensRatingCategory || 'Здесь будет категория'}
            isFetching={isFetching}
          />
        </div>
        <div className='w-full'>
          <div className='text-right mb-1'>
            <RatingMemberNew />
          </div>
          <RatingMembersAdmin
            ratingMembers={ratingWomenMembers}
            title='женского'
            category={ratingWomenMembers[0]?.womensRatingCategory || 'Здесь будет категория'}
            isFetching={isFetching}
          />
        </div>
      </div>
    </div>
  );
};

export default RatingMembersAdminList;
