import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import React, { type FormEvent, PropsWithChildren, useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LinkDataMutation, SocialNetworkIconsValue } from '@/types/footer';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SocialIcon } from 'react-social-icons';
import { toast } from 'sonner';
import { createSocialNetwork, getFooterItems } from '@/features/footers/footersThunks';
import { Loader } from '@/components/Loader/Loader';
import { selectItemCreating, selectItemsData } from '@/features/footers/footersSlice';

const SocialNetworkIcons: SocialNetworkIconsValue[] = [
  { name: 'instagram' },
  { name: 'telegram' },
  { name: 'facebook' },
  { name: 'email' },
  { name: 'whatsapp' },
];

const SocialNetworkCreateForm: React.FC<PropsWithChildren> = ({ children }) => {
  const dispatch = useAppDispatch();
  const socialNetworkData = useAppSelector(selectItemsData);
  const socialNetworkCreating = useAppSelector(selectItemCreating);
  const [socialNetwork, setSocialNetwork] = useState<LinkDataMutation>({
    name: '',
    value: '',
  });
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const blockedSocial = socialNetworkData?.[0]?.socialNetwork?.map((item) => item.name.toLowerCase()) ?? [];
  const isBlocked = blockedSocial.includes(socialNetwork.name.toLowerCase());

  useEffect(() => {
    if (!open) {
      setSocialNetwork({
        name: '',
        value: '',
      });
    }
  }, [open]);

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setSocialNetwork((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: FormEvent) => {
    try {
      event.preventDefault();
      if (socialNetwork.name.trim().length !== 0 && socialNetwork.value.trim().length !== 0 && !isBlocked) {
        closeRef.current?.click();
        await dispatch(createSocialNetwork(socialNetwork)).unwrap();
        await dispatch(getFooterItems()).unwrap();
        setSocialNetwork({
          name: '',
          value: '',
        });
        toast.success('Социальная сеть успешно добавлена.');
      }
    } catch (error) {
      console.error(error);
      toast.error('Ошибка при добавлении социальной сети.');
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Добавить социальную сеть</DialogTitle>
          <DialogDescription>Заполните форму перед добавлением.</DialogDescription>
          <form onSubmit={handleSubmit}>
            <div className={'flex flex-col justify-between gap-2 mb-3'}>
              {isBlocked && (
                <small className={'text-red-600 leading-none'}>
                  Социальная сеть {socialNetwork.name} уже существует.
                </small>
              )}
              <Select
                value={socialNetwork.name}
                onValueChange={(name) => setSocialNetwork((prevState) => ({ ...prevState, name: name }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder='Выберите социальную сеть' />
                </SelectTrigger>
                <SelectContent>
                  {SocialNetworkIcons.map((icon) => (
                    <SelectItem key={icon.name} value={icon.name}>
                      <SocialIcon
                        network={icon.name}
                        bgColor='#393F43'
                        fgColor='#fff'
                        style={{ height: 20, width: 20, marginRight: '5px' }}
                      />
                      {icon.name.charAt(0).toUpperCase() + icon.name.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Label htmlFor={'social-network'}>Адрес социальной сети</Label>
              <Input
                name='value'
                type='url'
                value={socialNetwork.value}
                onChange={inputChangeHandler}
                placeholder={'Введите URL социальной сети'}
                id={'social-network'}
              />
            </div>
            <div className={'flex flex-col gap-1'}>
              <Button
                disabled={
                  socialNetwork.name.trim().length === 0 || socialNetwork.value.trim().length === 0 || isBlocked
                }
                size={'sm'}
              >
                Добавить {socialNetworkCreating && <Loader size={'sm'} theme={'light'} />}
              </Button>
              <DialogClose ref={closeRef} asChild>
                <Button type={'button'} variant={'outline'}>
                  Отменить
                </Button>
              </DialogClose>
            </div>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default SocialNetworkCreateForm;
