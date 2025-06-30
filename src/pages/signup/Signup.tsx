import { Input } from '@/components/ui/input';
import relatikaLogo from '../../assets/relatika-abstract-logo.png';
import { Button } from '@/components/ui/button';
import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import { schema } from '@/models/signupForm';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { createUser } from '@/api/authApi';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import SelectAvatar from '@/components/specific/SelectAvatar';
type SignupForm = z.infer<typeof schema>;
const Signup = () => {
  const navigate = useNavigate();
  
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState:{errors},
  } = useForm<SignupForm>({
    resolver: zodResolver(schema)
  })
    const mutation = useMutation({
      mutationFn: async(formObj:any)=> createUser(formObj),
      onError: (error:any) => {
        toast.error(error?.response?.data?.error);
      },
      onSuccess:(response)=>{
        toast.success(response.message);
        localStorage.setItem('newUser','true')
        navigate('/login');
      }
    })
  const selectedAvatar = watch('avatar');
  const onSubmit = (values:SignupForm)=>{
    console.log(values)
    mutation.mutate(values)
  }
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gray-900">
      <div className="flex flex-col items-center gap-2 border-8 border-solid border-gray-700 rounded-4xl p-4 w-[420px] bg-white">
        <div className='w-[150px] overflow-hidden'>
          <img src={relatikaLogo} alt="relatika" />
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className='w-full'>
        <div className='flex flex-col items-center gap-4 *:w-full'>
          <div>
          <Input {...register('username')} placeholder='username' className='p-4' />
          {errors.username && <p className='text-red-500 self-start'>{errors.username.message}</p>}
          </div>
          <div>
          <Input {...register('email')} placeholder='email' className='p-4' type='email' />
          {errors.email && <p className='text-red-500 self-start'>{errors.email.message}</p>}
          </div>
          <div>
          <Input {...register('password')} placeholder='password' type='password' className='p-4' />
          {errors.password && <p className='text-red-500 self-start'>{errors.password.message}</p>}
          </div>
          <SelectAvatar selectedAvatar={selectedAvatar} setValue={setValue} errors={errors}/>
          <Button variant={'default'} type='submit' className='bg-blue-500 w-full'>Signup</Button>
        </div>
        </form>
      </div>
    </div>
  )
}

export default Signup