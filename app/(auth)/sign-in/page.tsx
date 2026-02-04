'use client'
import FooterLink from '@/components/forms/FooterLink'
import InputField from '@/components/forms/InputField'
import { Button } from '@/components/ui/button'
import { signInWithEmail } from '@/lib/actions/auth.actions'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

interface SignInFormData {
  email: string
  password: string
}

const SignIn = () => {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onBlur',
  })

  const onSubmit = async (data:SignInFormData) => {
    try{
      const result = await signInWithEmail(data)
      if (result.success)
        router.push('/')
    }catch(error){
      console.log(error)
      toast.error('Sign in failed. Please try again.',{
        description: error instanceof Error ? error.message : 'An unexpected error occurred. Please try again.'
      })
    }
  }

  return (
    <>
      <h1 className='form-title'>Sign In</h1>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
        <InputField
          name='email'
          label='Email'
          placeholder='johndoe@gmail.com'
          register={register}
          error={errors.email}
          validation={{ required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' } }}
        />
        <InputField
          name='password'
          label='Password'
          placeholder='Enter your password'
          type='password'
          register={register}
          error={errors.password}
          validation={{ required: 'Password is required', minLength: 8 }}
        />
        <Button type='submit' className='yellow-btn w-full mt-5' disabled={isSubmitting}>
          {isSubmitting ? 'Signing In' : 'Sign In'}
        </Button>
        <FooterLink text="Don't have an account?" linkText='Sign Up' href='/sign-up' />
      </form>
    </>
  )
}

export default SignIn