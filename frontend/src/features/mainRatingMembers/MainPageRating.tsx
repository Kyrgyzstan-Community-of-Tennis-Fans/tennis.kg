import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { selectRatingMembers, selectRatingMembersFetching } from '@/features/mainRatingMembers/ratingMembersSlice';
import { fetchRatingMembers } from '@/features/mainRatingMembers/ratingMembersThunks';
import RatingMembers from '@/features/mainRatingMembers/components/RatingMembers/RatingMembers';

const MainPageRating = () => {
  const dispatch = useAppDispatch();
  const ratingMembers = useAppSelector(selectRatingMembers);
  const ratingMembersFetching = useAppSelector(selectRatingMembersFetching);

  const ratingMenMembers = ratingMembers.filter((ratingMember) => ratingMember.gender === 'male');
  const ratingWomenMembers = ratingMembers.filter((ratingMember) => ratingMember.gender === 'female');

  useEffect(() => {
    dispatch(fetchRatingMembers());
  }, [dispatch]);

  return (
    <>
      <div>
        <RatingMembers
          ratingMembers={ratingMenMembers}
          isFetching={ratingMembersFetching}
          category={ratingMenMembers[0]?.mensRatingCategory || 'Мужская категория'}
          title={'Мужской'}
        />
      </div>
      <div className='mt-24 sm:mt-32 md:mt-36 lg:mt-48'>
        <RatingMembers
          ratingMembers={ratingWomenMembers}
          isFetching={ratingMembersFetching}
          category={ratingWomenMembers[0]?.mensRatingCategory || 'Женская категория'}
          title={'Женский'}
        />
      </div>
    </>
  );
};

export default MainPageRating;
