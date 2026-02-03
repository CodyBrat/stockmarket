'use client'
import InputField from '@/components/forms/inputField'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React from 'react'
import { useForm } from 'react-hook-form'

const SignUp = () => {
    const {
    register,
    handleSubmit,
    control,
    formState: { errors,isSubmitting},
  } = useForm<SignUpFormData>({
    defaultValues: {
    fullName: '',
    email: '',
    password: '',
    country: 'US',
    investmentGoals: 'Growth',
    riskTolerance: 'Medium',
    preferredIndustry: 'Technology',
    },mode: 'onBlur',
  })
  const onSubmit = async (data:SignInFormData) => {
    try{
      console.log(data)
    }catch(error){
      console.log(error)
    }
  }
  return (
    <>
      <h1 className='form-title'>Sign Up & Personalize</h1>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
        <InputField
          name='fullName'
          label='Full Name'
          placeholder='John Doe'
          register={register}
          error={errors.fullName}
          validation={{ required: 'Full Name is required', minLength:2}}
        />
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
          validation={{ required: 'Password is required', minLength:8}}
        />
        {/*Inputs}*/}
        <Button type='submit' className=' yellow-btn w-full mt-5' disabled={isSubmitting}>
          {isSubmitting ? 'Creating Account' : 'Start Your Investing Journey'}
        </Button>
      </form>
    </>
  )
}

export default SignUp