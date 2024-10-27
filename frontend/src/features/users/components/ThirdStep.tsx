import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { Rank } from '@/types/rankTypes';
import type { RegisterMutation } from '@/types/userTypes';
import React from 'react';

interface Props {
  registerMutation: RegisterMutation;
  handleSelectChange: (value: string, id: string) => void;
  ranks: Rank[];
  ranksFetching: boolean;
}

export const ThirdStep: React.FC<Props> = ({ registerMutation, handleSelectChange, ranks, ranksFetching }) => {
  return (
    <>
      <div className={'mb-4'}>
        <Label htmlFor={'gender'} className={'text-base font-medium block mb-1'}>
          Пол
        </Label>
        <Select value={registerMutation.gender} onValueChange={(value) => handleSelectChange(value, 'gender')}>
          <SelectTrigger id={'gender'}>
            <SelectValue placeholder='Укажите ваш пол' />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value='male'>Мужской</SelectItem>
              <SelectItem value='female'>Женский</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className={'mb-4'}>
        <Label htmlFor={'rank'} className={'text-base font-medium block mb-1'}>
          Категория
        </Label>
        <Select
          disabled={ranksFetching || ranks.length === 0}
          value={registerMutation.rank}
          onValueChange={(value) => handleSelectChange(value, 'rank')}
        >
          <SelectTrigger id={'rank'}>
            <SelectValue placeholder='Выберите вашу категорию' />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {ranks.map((item) => (
                <SelectItem key={item._id} value={item._id}>
                  {item.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </>
  );
};
