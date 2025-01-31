import React from 'react'
import { FormControl, FormField, FormLabel, FormMessage } from './ui/form'
import { Input } from './ui/input'
import { authFormSchema } from '@/lib/utils'
import {Control} from 'react-hook-form'
import { FieldPath } from 'react-hook-form'
import { z } from 'zod';

const formSchema = authFormSchema('sign-up');

interface customInputProps {
    control: Control<z.infer<typeof formSchema>>,
    name: FieldPath<z.infer<typeof formSchema>>,
    label: string,
    placeholder: string,
    type?: React.HTMLInputTypeAttribute | undefined
  }

const CustomInput = ({control, name, label, placeholder, type='text'}: customInputProps) => {
  return (
    <FormField
    control={control}
    name={name}
    render={({ field }) => (
        <div className='form-item'>
            <FormLabel className='form-label'>
                {label}
            </FormLabel>
            <div className='flex w-full'>
                <FormControl>
                    <Input
                        placeholder={placeholder}
                        className='input-class'
                        type={type}
                        {...field}
                    />
                </FormControl>
                <FormMessage
                    className='form-message mt-2'
                />
            </div>
        </div>
    )}
    />
  )
}

export default CustomInput