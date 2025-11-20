import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { Chrome } from 'lucide-react';

import AuthLayout from '@/components/layout/AuthLayout';
import { loginSchema } from '@/lib/validators';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';

const LoginPage = () => {
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data) => {
    console.log(data);
    toast.success('Login Successful!', {
      description: 'Redirecting you to your dashboard...',
    });
  };

  return (
    <AuthLayout title="Welcome Back" subtitle="Log in to manage your appointments.">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <Label>Email</Label>
                <FormControl>
                  <Input type="email" placeholder="you@example.com" {...field} className="bg-zinc-800/50 border-zinc-700 focus:border-rose-400 focus:ring-rose-400" />
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
                <Label>Password</Label>
                <FormControl>
                  <Input type="password" placeholder="••••••••" {...field} className="bg-zinc-800/50 border-zinc-700 focus:border-rose-400 focus:ring-rose-400" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full bg-rose-500 hover:bg-rose-600 text-white" size="lg">
            Login
          </Button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-zinc-700" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-zinc-900/50 px-2 text-zinc-400">Or continue with</span>
            </div>
          </div>
          
          <Button variant="outline" className="w-full bg-transparent border-zinc-700 hover:bg-zinc-800" size="lg">
            <Chrome className="mr-2 h-4 w-4" />
            Login with Google
          </Button>

          <p className="text-center text-sm text-zinc-400">
            Don't have an account?{' '}
            <Link to="/signup" className="font-medium text-rose-400 hover:underline">
              Sign Up
            </Link>
          </p>
        </form>
      </Form>
    </AuthLayout>
  );
};

export default LoginPage;
