import RatingMembersTop8 from '@/features/mainRatingMembers/components/RatingMembersTop8/RatingMembersTop8';
import RatingMembersTop3 from '@/features/mainRatingMembers/components/RatingMembersTop3/RatingMembersTop3';
import { useRatingMembers } from '@/features/mainRatingMembers/hooks/useRatingMembers';

const MainPageRating = () => {
  const { ratingMembers, ratingMembersFetching, ratingMenMembersTop8, ratingMenMembersTop3, ratingWomenMembers } =
    useRatingMembers();

  return (
    <>
      <div className='mb-12 sm:mb-16 md:mb-18 lg:mb-20'>
        <RatingMembersTop8
          ratingMembers={ratingMenMembersTop8}
          isFetching={ratingMembersFetching}
          category={ratingMembers[0]?.mensRatingCategoryTop8 || 'Мужская категория'}
          title={'Мужской'}
        />
      </div>
      <div className='mb-24 sm:mb-32 md:mb-36 lg:mb-40'>
        <RatingMembersTop3
          ratingMembers={ratingMenMembersTop3}
          isFetching={ratingMembersFetching}
          category={ratingMembers[0]?.mensRatingCategoryTop3 || 'Мужская категория'}
          subtitle={'участника'}
          existingTitle={false}
        />
      </div>
      <div>
        <RatingMembersTop3
          ratingMembers={ratingWomenMembers}
          isFetching={ratingMembersFetching}
          category={ratingMembers[0]?.womensRatingCategoryTop3 || 'Женская категория'}
          title={'Женский'}
          subtitle={'участницы'}
          existingTitle={true}
        />
      </div>
    </>
  );
};

export default MainPageRating;
