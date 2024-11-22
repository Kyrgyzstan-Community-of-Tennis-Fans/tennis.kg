import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { selectRegisterError, selectRegisterLoading } from '@/features/users/usersSlice';
import { selectCategories, selectCategoriesFetching } from '@/features/category/categorySlice';
import { useNavigate } from 'react-router-dom';
import { type ChangeEvent, type FormEvent, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { fetchCategories } from '@/features/category/categoryThunks';
import { register } from '@/features/users/usersThunks';
import type { RegisterMutation } from '@/types/user';
import { formatDateOfBirth } from '@/lib/formatDateOfBirth';
import { formatTelephone } from '@/lib/formatTelephone';

const initialState: RegisterMutation = {
  telephone: '',
  password: '',
  category: '',
  fullName: '',
  gender: '',
  dateOfBirth: '',
  email: '',
};

export const useRegister = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectRegisterLoading);
  const categories = useAppSelector(selectCategories);
  const categoriesFetching = useAppSelector(selectCategoriesFetching);
  const error = useAppSelector(selectRegisterError);
  const navigate = useNavigate();
  const [registerMutation, setRegisterMutation] = useState(initialState);
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [isRulesChecked, setIsRulesChecked] = useState({
    rules: false,
    personalData: false,
  });

  useEffect(() => {
    if (error && error.errors) {
      Object.values(error.errors).forEach((err) => {
        toast.error(err.message);
      });
    }
  }, [error]);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    const date = formatDateOfBirth(event.target.value);

    updateRegisterField('dateOfBirth', date);
  };

  const handleRulesChange = (value: boolean, id: string) => {
    setIsRulesChecked((prev) => ({ ...prev, [id]: value }));
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;

    if (id === 'telephone') {
      const formattedPhone = formatTelephone(value);

      setRegisterMutation((prev) => ({ ...prev, telephone: formattedPhone }));
      return;
    }

    updateRegisterField(id, value);
  };

  const handleSelectChange = (value: string, id: string) => {
    const field = id === 'gender' ? 'gender' : 'category';
    updateRegisterField(field, value);
  };

  const updateRegisterField = (field: string, value: string) => {
    setRegisterMutation((prev) => ({ ...prev, [field]: value }));
  };

  const isFormValid = () => {
    const isFilled =
      Object.values(registerMutation).every((value) => value.trim() !== '') &&
      confirmPassword.trim() !== '' &&
      registerMutation.telephone.length === 12 &&
      registerMutation.dateOfBirth.length === 10;
    const passwordsMatch = registerMutation.password === confirmPassword;
    const isRulesAccepted = Object.values(isRulesChecked).every((value) => value);

    return isFilled && passwordsMatch && isRulesAccepted;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await dispatch(register(registerMutation)).unwrap();
    setRegisterMutation(initialState);
    navigate('/');
  };

  return {
    loading,
    categories,
    categoriesFetching,
    registerMutation,
    confirmPassword,
    setConfirmPassword,
    handleDateChange,
    handleSelectChange,
    handleRulesChange,
    handleChange,
    isFormValid,
    handleSubmit,
  };
};
