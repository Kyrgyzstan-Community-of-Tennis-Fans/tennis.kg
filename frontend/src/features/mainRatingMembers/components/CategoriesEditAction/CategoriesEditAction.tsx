import React from 'react';
import RatingMembersCategoriesEdit from '@/features/mainRatingMembers/components/RatingMemberCategoriesEdit/RatingMembersCategoriesEdit';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import { RatingMember } from '@/types/ratingMemberTypes';

interface Props {
  ratingMembers: RatingMember[];
}

const CategoriesEditAction: React.FC<Props> = ({ ratingMembers }) => {
  if (ratingMembers.length > 0) {
    return (
      <RatingMembersCategoriesEdit
        existingMensCategoryTop8={ratingMembers[0]?.mensRatingCategoryTop8 || ''}
        existingMensCategoryTop3={ratingMembers[0]?.mensRatingCategoryTop3 || ''}
        existingWomensCategoryTop3={ratingMembers[0]?.womensRatingCategoryTop3 || ''}
      />
    );
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button>
          Изменить категории <PencilSquareIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <small>Для редактирования добавьте хотя бы одного участника рейтинга</small>
      </PopoverContent>
    </Popover>
  );
};

export default CategoriesEditAction;
