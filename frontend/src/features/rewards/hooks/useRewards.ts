import { useAppDispatch, useAppSelector } from '@/app/hooks';
import {
  selectRewards,
  selectRewardsCreating,
  selectRewardsDeleting,
  selectRewardsFetching,
} from '@/features/rewards/rewardsSlice';
import { fetchRewards } from '@/features/rewards/rewardsThunks';
import { useEffect } from 'react';

export const useRewards = () => {
  const dispatch = useAppDispatch();
  const rewards = useAppSelector(selectRewards);
  const rewardsFetching = useAppSelector(selectRewardsFetching);
  const rewardsDeleting = useAppSelector(selectRewardsDeleting);
  const rewardsCreating = useAppSelector(selectRewardsCreating);

  useEffect(() => {
    dispatch(fetchRewards());
  }, [dispatch]);

  return { dispatch, rewards, rewardsFetching, rewardsDeleting, rewardsCreating };
};
