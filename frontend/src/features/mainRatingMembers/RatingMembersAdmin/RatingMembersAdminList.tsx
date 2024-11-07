import RatingMembersAdmin from '@/features/mainRatingMembers/RatingMembersAdmin/components/RatingMembersAdmin/RatingMembersAdmin';
import RatingMembersCategoriesEdit from '@/features/mainRatingMembers/RatingMembersAdmin/components/RatingMemberCategoriesEdit/RatingMembersCategoriesEdit';
import { Loader } from '@/components/Loader/Loader';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { EditIcon } from 'lucide-react';
import { useRatingMembers } from '@/features/mainRatingMembers/hooks/useRatingMembers';
import RatingMemberNew from '@/features/mainRatingMembers/RatingMembersAdmin/components/RatingMemberNew/RatingMemberNew';

const RatingMembersAdminList = () => {
  const { ratingMembersFetching, ratingMenMembersTop8, ratingMenMembersTop3, ratingWomenMembers, existingMembers } =
    useRatingMembers();

  return ratingMembersFetching ? (
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
          <Popover>
            <PopoverTrigger asChild>
              <Button size='sm'>
                Изменить категории <EditIcon />
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <small>Для редактирования должно быть минимум по одному участнику в женском и в мужских топах</small>
            </PopoverContent>
          </Popover>
        )}
      </div>
      <div className='flex flex-col gap-14 '>
        <div className='w-full'>
          <div className='text-center sm:text-right mb-5'>
            <RatingMemberNew forWhichGender={'male'} />
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
            <RatingMemberNew forWhichGender={'female'} />
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
