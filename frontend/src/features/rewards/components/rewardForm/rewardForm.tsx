import { Loader } from '@/components/Loader/Loader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { RewardMutation } from '@/types/rewardTypes';
import type { User } from '@/types/userTypes';
import React from 'react';

interface Props {
  users: User[];
  onSubmit: (rewardMutation: RewardMutation) => void;
  loading: boolean;
}

const initialState: RewardMutation = {
  title: '',
  description: '',
  user: '',
};

export const RewardForm: React.FC<Props> = ({ users, loading, onSubmit }) => {
  const [rewardMutation, setRewardMutation] = React.useState<RewardMutation>(initialState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRewardMutation({
      ...rewardMutation,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({ ...rewardMutation });
  };

  const handleUserChange = (value: string) => {
    setRewardMutation({
      ...rewardMutation,
      user: value,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <Label htmlFor={'title'}>Название</Label>
        <Input
          id={'title'}
          value={rewardMutation.title}
          onChange={handleChange}
          required
          placeholder={'Введите название'}
        />
      </div>

      <div>
        <Label htmlFor={'description'}>Описание</Label>
        <Input
          id={'description'}
          value={rewardMutation.description}
          onChange={handleChange}
          required
          placeholder={'Введите описание'}
        />
      </div>

      <div>
        <Label htmlFor={'user'}>Пользователь</Label>
        <Select onValueChange={handleUserChange} required>
          <SelectTrigger id={'user'}>
            <SelectValue placeholder={'Выберите пользователя'} />
          </SelectTrigger>
          <SelectContent>
            {users.map((user) => (
              <SelectItem key={user._id} value={user._id}>
                {user.fullName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button disabled={loading} type={'submit'} className={'w-full mt-2'} size={'sm'}>
        Наградить
        {loading && <Loader theme={'light'} size={'sm'} />}
      </Button>
    </form>
  );
};
