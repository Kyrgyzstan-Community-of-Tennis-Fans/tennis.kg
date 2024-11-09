import RatingMembersAdmin from '@/features/mainRatingMembers/RatingMembersAdmin/components/RatingMembersAdmin/RatingMembersAdmin';
import RatingMembersCategoriesEdit from '@/features/mainRatingMembers/RatingMembersAdmin/components/RatingMemberCategoriesEdit/RatingMembersCategoriesEdit';
import { Loader } from '@/components/Loader/Loader';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { EditIcon } from 'lucide-react';
import { useRatingMembers } from '@/features/mainRatingMembers/hooks/useRatingMembers';
import RatingMemberNew from '@/features/mainRatingMembers/RatingMembersAdmin/components/RatingMemberNew/RatingMemberNew';

const RatingMembersAdminList = () => {
  const { ratingMembers, ratingMembersFetching, ratingMenMembersTop8, ratingMenMembersTop3, ratingWomenMembers } =
    useRatingMembers();

  return ratingMembersFetching ? (
    <Loader className='mx-auto my-[10%]' />
  ) : (
    <div className='lg:max-w-[900px] lg:mx-auto mb-7 mt-8'>
      <div className='text-center sm:text-right mb-2 sm:mb-3'>
        {ratingMembers.length > 0 ? (
          <RatingMembersCategoriesEdit
            existingMensCategoryTop8={ratingMembers[0]?.mensRatingCategoryTop8 || ''}
            existingMensCategoryTop3={ratingMembers[0]?.mensRatingCategoryTop3 || ''}
            existingWomensCategoryTop3={ratingMembers[0]?.womensRatingCategoryTop3 || ''}
          />
        ) : (
          <Popover>
            <PopoverTrigger asChild>
              <Button size='sm'>
                Изменить категории <EditIcon />
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <small>Для редактирования добавьте хотя бы одного участника рейтинга</small>
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
              category={ratingMembers[0]?.mensRatingCategoryTop8 || 'Здесь будет категория'}
            />
          </div>
          <div>
            <RatingMembersAdmin
              ratingMembers={ratingMenMembersTop3}
              title='Топ-3 мужского'
              category={ratingMembers[0]?.mensRatingCategoryTop3 || 'Здесь будет категория'}
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
            category={ratingMembers[0]?.womensRatingCategoryTop3 || 'Здесь будет категория'}
          />
        </div>
      </div>
    </div>
  );
};

export default RatingMembersAdminList;
