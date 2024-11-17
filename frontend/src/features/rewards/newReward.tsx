import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { RewardForm } from '@/features/rewards/components/rewardForm/rewardForm';
import { useUsers } from '@/features/users/hooks/useUsers';
import type { RewardMutation } from '@/types/rewardTypes';
import React, { type PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {
  onSubmit: (rewardMutation: RewardMutation) => void;
  loading: boolean;
}

export const NewReward: React.FC<Props> = ({ onSubmit, loading, children }) => {
  const { users } = useUsers();

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Новая награда</DialogTitle>
          <DialogDescription>Заполните форму для создания новой награды</DialogDescription>

          <RewardForm loading={loading} onSubmit={onSubmit} users={users} />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
