import { useEffect } from 'react';
import Checkbox from '@/Components/Checkbox';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import { Input, Button } from '@material-tailwind/react';
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

export default function Login({ status, canResetPassword }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    email: '',
    password: '',
    remember: false,
  });

  useEffect(() => {
    return () => {
      reset('password');
    };
  }, []);

  const togglePasswordVisibility = () => {
    setData('showPassword', !data.showPassword);
  };

  const showPassword = data.showPassword || false;

  const submit = (e) => {
    e.preventDefault();
    post(route('login'));
  };

  return (
    <GuestLayout>
      <Head title="Log in" />

      {status && <div className="mb-4 text-sm font-medium text-green-600">{status}</div>}

      <form onSubmit={submit}>
        <div>
          <InputLabel htmlFor="email" value="Email" />

          <TextInput
            id="email"
            type="email"
            name="email"
            value={data.email}
            className="block w-full mt-1"
            autoComplete="username"
            isFocused={true}
            onChange={(e) => setData('email', e.target.value)}
          />

          <InputError message={errors.email} className="mt-2" />
        </div>

        <div className="mt-4">
          <InputLabel htmlFor="password" value="Password" />

          <div className="relative flex w-full">
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={data.password}
              labelProps={{className:'hidden'}}
              onChange={(e) => setData('password', e.target.value)}
              className="block w-full mt-1 shadow-none"
              autoComplete="current-password"
              containerProps={{
                className: "min-w-0",
              }}
            />
            <Button
              size="sm"
              onClick={togglePasswordVisibility}
              className="!absolute right-1 top-3 p-1 rounded bg-white shadow-none hover:shadow-none"
            >
              {showPassword ? <EyeIcon className="w-5 h-5 text-black" /> : <EyeSlashIcon className="w-5 h-5 text-black" />}
            </Button>
          </div>

          <InputError message={errors.password} className="mt-2" />
        </div>

        <div className="block mt-4">
          <label className="flex items-center">
            <Checkbox
              name="remember"
              checked={data.remember}
              onChange={(e) => setData('remember', e.target.checked)}
            />
            <span className="ml-2 text-sm text-gray-600">Remember me</span>
          </label>
        </div>

        <div className="flex items-center justify-end mt-4">
          {canResetPassword && (
            <Link
              href={route('password.request')}
              className="text-sm text-gray-600 underline rounded-md hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Forgot your password?
            </Link>
          )}

          <PrimaryButton className="ml-4" disabled={processing}>
            Log in
          </PrimaryButton>
        </div>
      </form>
    </GuestLayout>
  );
}