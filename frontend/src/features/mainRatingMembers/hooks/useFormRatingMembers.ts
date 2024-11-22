import { RatingMember, RatingMemberMutation } from '@/types/ratingMember';

export const useFormRatingMembers = (
  ratingMembers: RatingMember[],
  state: RatingMemberMutation,
  forWhichGender: 'male' | 'female',
  existingMember?: RatingMember,
  isLoading?: boolean,
) => {
  const allMembersNames = ratingMembers?.map((ratingMember) => ratingMember.name.toLowerCase());
  const existingName = allMembersNames?.includes(state.name.toLowerCase());

  const membersInTargetType = ratingMembers.filter(
    (member) => member.ratingType === state.ratingType && (!existingMember || member._id !== existingMember._id),
  );

  const maxMembersExceeded =
    forWhichGender === 'female'
      ? membersInTargetType.length >= 3
      : state.ratingType === 'mensTop8'
        ? membersInTargetType.length >= 8
        : state.ratingType === 'mensTop3'
          ? membersInTargetType.length >= 3
          : false;

  const isFormInvalid =
    isLoading ||
    !state.place ||
    state.image === null ||
    (!existingMember && existingName) ||
    (existingMember && existingMember.name !== state.name && existingName) ||
    maxMembersExceeded;

  return { existingName, maxMembersExceeded, isFormInvalid };
};
