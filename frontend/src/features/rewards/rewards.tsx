import { RewardCard } from '@/components/FileInput/RewardCard/RewardCard';
import { Loader } from '@/components/Loader/Loader';
import { Button } from '@/components/ui/button';
import { useRewards } from '@/features/rewards/hooks/useRewards';
import { NewReward } from '@/features/rewards/newReward';
import { createReward, deleteReward } from '@/features/rewards/rewardsThunks';
import type { RewardMutation } from '@/types/rewardTypes';
import { SquaresPlusIcon } from '@heroicons/react/24/outline';
import React from 'react';

export const Rewards: React.FC = () => {
  const { dispatch, rewardsFetching, rewards, rewardsDeleting, rewardsCreating } = useRewards();

  const handleDelete = (id: string) => {
    dispatch(deleteReward(id));
  };

  const handleCreate = (rewardMutation: RewardMutation) => {
    dispatch(createReward(rewardMutation));
  };

  return (
    <div>
      <header className={'flex md:items-center justify-between gap-2 flex-col md:flex-row border-b pb-1.5 mb-4'}>
        <div>
          <h1 className={'text-2xl font-medium leading-none'}>Награды</h1>
          <small className={'text-muted-foreground text-base'}>Список всех наград и управление наградами.</small>
        </div>

        <NewReward loading={rewardsCreating} onSubmit={handleCreate}>
          <Button size={'sm'} className={'font-normal'}>
            Создать награду <SquaresPlusIcon />
          </Button>
        </NewReward>
      </header>

      {rewardsFetching ? (
        <Loader />
      ) : !rewardsFetching && rewards.length === 0 ? (
        <span>Список наград пуст</span>
      ) : (
        <div className={'grid grid-cols-4 gap-3'}>
          {rewards.map((item) => (
            <RewardCard key={item._id} item={item} onDelete={handleDelete} deletingId={rewardsDeleting} />
          ))}
        </div>
      )}
    </div>
  );
};
