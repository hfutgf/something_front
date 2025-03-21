import { useMutation } from '@tanstack/react-query';
import  { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';

import { RegisterFormData } from '@/components/schemas/auth';
import { api } from '@/lib/axios';

import { UserType } from '../types/user.type';

const registerUser = async (data: RegisterFormData) => {
  const response = await api.post<{
    user: UserType;
    accessToken: string;
  }>(`/auth/register`, data);
  return response.data;
};

export const useRegisterMutation = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      router.push('/auth/register');
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      console.error(
        'Registration failed:',
        error.response?.data?.message || error.message,
      );
    },
  });
};
