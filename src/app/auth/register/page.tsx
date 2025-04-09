'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useForm } from 'react-hook-form';

import { RegisterFormData, registerSchema } from '@/components/schemas/auth';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useRegisterMutation } from '@/features/auth/hooks/use-register-mutation';

export default function RegisterPage() {
  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
      birthday: '',
    },
  });

  const registerMutation = useRegisterMutation();

  const onSubmit = (data: RegisterFormData) => {
    registerMutation.mutate(data);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-gray-800 rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your first name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your last name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Confirm your password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="birthday"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Birthday</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            size={'lg'}
            type="submit"
            className="w-full bg-white hover:bg-white hover:opacity-75 mt-4 text-black"
            disabled={registerMutation.isPending}
          >
            {registerMutation.isPending ? 'Registering...' : 'Register'}
          </Button>
        </form>
      </Form>

      {registerMutation.isError && (
        <div className="mt-4 text-center text-sm text-red-500">
          {registerMutation.error.response?.data?.message ||
            registerMutation.error.message}
        </div>
      )}

      <div className="mt-4 text-center text-sm text-gray-400">
        <p>
          Already have an account?{' '}
          <Link href="/auth/login" className="text-blue-400 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
