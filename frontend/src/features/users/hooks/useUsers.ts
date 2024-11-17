import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { selectUsersList } from '@/features/users/usersSlice';
import { fetchUsers } from '@/features/users/usersThunks';
import { useEffect } from 'react';

export const useUsers = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector(selectUsersList);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return { users };
};
