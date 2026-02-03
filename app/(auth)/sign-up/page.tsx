'use client'
import { Button } from '@/components/ui/button'
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
        {/*Inputs}*/}
        <Button type='submit' className=' yellow-btn w-full mt-5' disabled={isSubmitting}>
          {isSubmitting ? 'Creating Account' : 'Start Your Investing Journey'}
        </Button>
      </form>
    </>
  )
}

export default SignUp