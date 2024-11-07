import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { TrashIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { PopoverClose } from '@radix-ui/react-popover';
import React, { type PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {
  text?: string;
  onOk?: () => void;
  onCancel?: () => void;
  onOkText?: string;
  onCancelText?: string;
  onOkIcon?: React.ReactNode;
}

export const Confirm: React.FC<Props> = ({
  text = 'Вы действительно хотите?',
  onOk,
  onCancel,
  onOkText = 'Удалить',
  onCancelText = 'Отменить',
  onOkIcon = <TrashIcon strokeWidth={1.2} />,
  children,
}) => {
  return (
    <Popover>
      <PopoverTrigger asChild onClick={(e) => e.stopPropagation()}>
        {children}
      </PopoverTrigger>
      <PopoverContent onClick={(e) => e.stopPropagation()} className={'max-w-max space-x-1 p-2'}>
        <small className={'block text-center mb-1'}>{text}</small>
        <div className={'flex gap-1'}>
          <PopoverClose asChild>
            <Button onClick={onCancel} size={'sm'} variant={'outline'} className={'flex-1'}>
              {onCancelText}
              <XMarkIcon />
            </Button>
          </PopoverClose>
          <PopoverClose asChild>
            <Button onClick={onOk} size={'sm'} className={'flex-1'}>
              {onOkText} {onOkIcon}
            </Button>
          </PopoverClose>
        </div>
      </PopoverContent>
    </Popover>
  );
};
