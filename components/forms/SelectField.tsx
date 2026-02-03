import React from 'react'
import { Controller } from 'react-hook-form'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const SelectField = ({name,label,placeholder,options,control,error,required=false}:SelectFieldProps) => {
  return (
    <div className="space-y-2">
        <label htmlFor={name} className='form-label'>
            {label}
        </label>
        <Controller name={name} control={control} rules={{ required: required ? `${label} is required` : false }} render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange} >
            <SelectTrigger className="select-trigger">
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-60 text-white">
                <SelectGroup>
                {options.map((option) => (
                    <SelectItem key={option.value} value={option.value} className='focus:bg-gray-700 focus:text-white'>
                        {option.label}
                    </SelectItem>
                ))}
                </SelectGroup>
            </SelectContent>
            {error && <p className='text-sm text-red-500'>{error.message}</p>}
            </Select>
        )}
          />
    </div>
  )
}

export default SelectField