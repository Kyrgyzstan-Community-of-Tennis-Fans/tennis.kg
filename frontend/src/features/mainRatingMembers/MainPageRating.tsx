import RatingMembers from '@/features/mainRatingMembers/components/RatingMembersTop/RatingMembersTop';
import { useRatingMembers } from '@/features/mainRatingMembers/hooks/useRatingMembers';

const MainPageRating = () => {
  const { ratingMembers, ratingMembersFetching, ratingMenMembersTop8, ratingMenMembersTop3, ratingWomenMembers } =
    useRatingMembers();

  return (
    <>
      <div className='mb-12 sm:mb-16 md:mb-18 lg:mb-20'>
        <RatingMembers
          ratingMembers={ratingMenMembersTop8}
          isFetching={ratingMembersFetching}
          category={ratingMembers[0]?.mensRatingCategoryTop8 || 'Мужская категория'}
          title='Мужской'
          ratingType='top8'
        />
      </div>
      <div className='mb-24 sm:mb-32 md:mb-36 lg:mb-40'>
        <RatingMembers
          ratingMembers={ratingMenMembersTop3}
          isFetching={ratingMembersFetching}
          category={ratingMembers[0]?.mensRatingCategoryTop3 || 'Мужская категория'}
          subtitle='участника'
          ratingType='top3'
        />
      </div>
      <div>
        <RatingMembers
          ratingMembers={ratingWomenMembers}
          isFetching={ratingMembersFetching}
          category={ratingMembers[0]?.womensRatingCategoryTop3 || 'Женская категория'}
          title='Женский'
          subtitle='участницы'
          ratingType='top3'
        />
      </div>
    </>
  );
};

export default MainPageRating;
