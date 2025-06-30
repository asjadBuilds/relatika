import { Input } from '@/components/ui/input';
import relatikaLogo from '../../assets/relatika-abstract-logo.png';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { schema } from '@/models/loginForm';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { loginUser } from '@/api/authApi';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '@/context/reducers/userSlice';
import { useLoginStatus } from '@/context/LoginStatusContext';
type LoginForm = z.infer<typeof schema>;
const Login = () => {
  const [isEmailMethod, setIsEmailMethod] = useState(false);
  const {setLoginStatus} = useLoginStatus()
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginForm>({
    resolver: zodResolver(schema)
  })
  const mutation = useMutation({
    mutationFn: async(formObj:any) => loginUser(formObj),
    onError: (error:any) => {
      toast.error(error?.response?.data?.error);
    },
    onSuccess: (response) => {
      toast.success(response.message);
      dispatch(setUser(response?.data?.user));
      setLoginStatus(true);
      localStorage.setItem('userDetails', JSON.stringify(response?.data?.user));
      const newUser = localStorage.getItem('newUser');
      if (newUser === 'true') {
        localStorage.removeItem('newUser');
        navigate('/select-space');
      }else{
        navigate('/');
      }
    }
  });

  const onSubmit = (data: LoginForm) => {
    mutation.mutate(data)
  }
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gray-900">
        <div className="flex flex-col items-center gap-2 border-8 border-solid border-gray-700 rounded-4xl p-4 w-[420px] bg-white">
            <div className='w-[150px] overflow-hidden'>
                <img src={relatikaLogo} alt="relatika" />
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className='w-full'>
            <div className='flex flex-col items-center gap-4 *:w-full'>
              {isEmailMethod ? 
              <div>
                <Input {...register('email')} placeholder='email address' className='p-4'/>
                {errors.email && <p className='text-red-500 self-start'>{errors.email.message}</p>}
              </div> : 
              <div>
                <Input {...register('username')} placeholder='username' className='p-4'/>
                {errors.username && <p className='text-red-500 self-start'>{errors.username.message}</p>}
              </div> }
              <div>
                <Input {...register('password')} placeholder='password' type='password' className='p-4'/>
                {errors.password && <p className='text-red-500 self-start'>{errors.password.message}</p>}
              </div>
                <Button variant={'default'} type='submit' className='bg-blue-500 w-full'>Login</Button>
            </div>
            </form>
            <Button className='bg-blue-500 self-start' variant={'default'} onClick={()=>setIsEmailMethod(!isEmailMethod)}>Sign In with {isEmailMethod ? 'username' : 'email address'}</Button>
        </div>
    </div>
  )
}

export default Login