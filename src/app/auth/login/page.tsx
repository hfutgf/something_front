'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';

import { GoogleIcon } from '@/components/icons';
import { LoginFormData, loginSchema } from '@/components/schemas/auth';
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

export default function LoginPage() {
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    // eslint-disable-next-line no-console
    console.log('Form data:', data);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-gray-800 rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
          <Button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-600 hover:opacity-75"
          >
            Login
          </Button>
        </form>
      </Form>

      <hr className="my-6" />

      <div className="mt-4 text-center">
        <Button
          onClick={() => signIn('google')}
          variant="outline"
          className="w-full mt-4 flex items-center justify-center gap-2 text-black hover:opacity-75"
        >
          <GoogleIcon className="w-5 h-5" /> <span>Login with Google</span>
        </Button>
      </div>

      <div className="mt-4 text-center text-sm text-gray-400">
        <p>
          Don&apos;t have an account?{' '}
          <Link
            href="/auth/register"
            className="text-purple-400 hover:underline"
          >
            Register
          </Link>
        </p>
        <p className="mt-2">
          Forgot your password?{' '}
          <Link
            href="/auth/forgot-password"
            className="text-purple-400 hover:underline"
          >
            Reset it
          </Link>
        </p>
      </div>
    </div>
  );
}
