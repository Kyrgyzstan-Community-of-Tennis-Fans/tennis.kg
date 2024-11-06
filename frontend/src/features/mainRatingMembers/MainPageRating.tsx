import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { selectRatingMembers, selectRatingMembersFetching } from '@/features/mainRatingMembers/ratingMembersSlice';
import { fetchRatingMembers } from '@/features/mainRatingMembers/ratingMembersThunks';
import RatingMembersTop8 from '@/features/mainRatingMembers/components/RatingMembersTop8/RatingMembersTop8';
import RatingMembersTop3 from '@/features/mainRatingMembers/components/RatingMembersTop3/RatingMembersTop3';

const MainPageRating = () => {
  const dispatch = useAppDispatch();
  const ratingMembers = useAppSelector(selectRatingMembers);
  const ratingMembersFetching = useAppSelector(selectRatingMembersFetching);

  const ratingMenMembersTop8 = ratingMembers.filter(
    (ratingMember) => ratingMember.gender === 'male' && ratingMember.ratingType === 'mensTop8',
  );
  const ratingMenMembersTop3 = ratingMembers.filter(
    (ratingMember) => ratingMember.gender === 'male' && ratingMember.ratingType === 'mensTop3',
  );
  const ratingWomenMembers = ratingMembers.filter((ratingMember) => ratingMember.gender === 'female');

  useEffect(() => {
    dispatch(fetchRatingMembers());
  }, [dispatch]);

  return (
    <>
      <div className='mb-12 sm:mb-16 md:mb-18 lg:mb-20'>
        <RatingMembersTop8
          ratingMembers={ratingMenMembersTop8}
          isFetching={ratingMembersFetching}
          category={ratingMenMembersTop8[0]?.mensRatingCategoryTop8 || 'Мужская категория'}
          title={'Мужской'}
        />
      </div>
      <div className='mb-24 sm:mb-32 md:mb-36 lg:mb-40'>
        <RatingMembersTop3
          ratingMembers={ratingMenMembersTop3}
          isFetching={ratingMembersFetching}
          category={ratingMenMembersTop3[0]?.mensRatingCategoryTop3 || 'Мужская категория'}
          subtitle={'участника'}
          existingTitle={false}
        />
      </div>
      <div>
        <RatingMembersTop3
          ratingMembers={ratingWomenMembers}
          isFetching={ratingMembersFetching}
          category={ratingWomenMembers[0]?.womensRatingCategoryTop3 || 'Женская категория'}
          title={'Женский'}
          subtitle={'участницы'}
          existingTitle={true}
        />
      </div>
    </>
  );
};

export default MainPageRating;
