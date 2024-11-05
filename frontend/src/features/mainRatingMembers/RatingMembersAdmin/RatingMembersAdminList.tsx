import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { selectRatingMembers, selectRatingMembersFetching } from '@/features/mainRatingMembers/ratingMembersSlice';
import { fetchRatingMembers } from '@/features/mainRatingMembers/ratingMembersThunks';
import RatingMembersAdmin from '@/features/mainRatingMembers/RatingMembersAdmin/components/RatingMembersAdmin/RatingMembersAdmin';
import RatingMembersCategoriesEdit from '@/features/mainRatingMembers/RatingMembersAdmin/components/RatingMemberCategoriesEdit/RatingMembersCategoriesEdit';
import RatingManNew from '@/features/mainRatingMembers/RatingMembersAdmin/components/RatingManNew/RatingManNew';
import RatingWomanNew from '@/features/mainRatingMembers/RatingMembersAdmin/components/RatingWomanNew/RatingWomanNew';
import { Loader } from '@/components/Loader/Loader';

const RatingMembersAdminList = () => {
  const dispatch = useAppDispatch();
  const isFetching = useAppSelector(selectRatingMembersFetching);
  const ratingMembers = useAppSelector(selectRatingMembers);

  const ratingMenMembersTop8 = ratingMembers.filter(
    (ratingMember) => ratingMember.gender === 'male' && ratingMember.ratingType === 'mensTop8',
  );
  const ratingMenMembersTop3 = ratingMembers.filter(
    (ratingMember) => ratingMember.gender === 'male' && ratingMember.ratingType === 'mensTop3',
  );
  const ratingWomenMembers = ratingMembers.filter((ratingMember) => ratingMember.gender === 'female');
  const existingMembers =
    ratingMenMembersTop8.length > 0 && ratingMenMembersTop3.length > 0 && ratingWomenMembers.length > 0;

  useEffect(() => {
    dispatch(fetchRatingMembers());
  }, [dispatch]);

  return isFetching ? (
    <Loader className='mx-auto my-[10%]' />
  ) : (
    <div className='lg:max-w-[900px] lg:mx-auto mb-7 mt-8'>
      <div className='text-center sm:text-right mb-2 sm:mb-3'>
        {existingMembers ? (
          <RatingMembersCategoriesEdit
            existingMensCategoryTop8={ratingMenMembersTop8[0]?.mensRatingCategoryTop8 || ''}
            existingMensCategoryTop3={ratingMenMembersTop3[0]?.mensRatingCategoryTop3 || ''}
            existingWomensCategoryTop3={ratingWomenMembers[0]?.womensRatingCategoryTop3 || ''}
          />
        ) : (
          <p className='text-red-500'>
            Для редактирования должно быть минимум по одному участнику в женском и в мужских топах
          </p>
        )}
      </div>
      <div className='flex flex-col gap-14 '>
        <div className='w-full'>
          <div className='text-center sm:text-right mb-5'>
            <RatingManNew />
          </div>
          <div className='mb-10'>
            <RatingMembersAdmin
              ratingMembers={ratingMenMembersTop8}
              title='Топ-8 мужского'
              category={ratingMenMembersTop8[0]?.mensRatingCategoryTop8 || 'Здесь будет категория'}
            />
          </div>
          <div>
            <RatingMembersAdmin
              ratingMembers={ratingMenMembersTop3}
              title='Топ-3 мужского'
              category={ratingMenMembersTop3[0]?.mensRatingCategoryTop3 || 'Здесь будет категория'}
            />
          </div>
        </div>
        <div className='w-full'>
          <div className='text-center sm:text-right mb-5'>
            <RatingWomanNew />
          </div>
          <RatingMembersAdmin
            ratingMembers={ratingWomenMembers}
            title='Топ-3 женского'
            category={ratingWomenMembers[0]?.womensRatingCategoryTop3 || 'Здесь будет категория'}
          />
        </div>
      </div>
    </div>
  );
};

export default RatingMembersAdminList;
