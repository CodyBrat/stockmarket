// import React from 'react'

// const CountrySelectField = ({name,label,placeholder,error,required=false}:SelectFieldProps) => {
//   return (
//     <div className="space-y-2">
//         <label htmlFor={name} className='form-label'>
//             {label}
//         </label>
//         <select
//           id={name}
//           className='form-select'
//         >
//           <option value="">Select your country</option>
//           <option value="US">United States</option>
//           <option value="CA">Canada</option>
//           <option value="GB">United Kingdom</option>
//           <option value="AU">Australia</option>
//           <option value="IN">India</option>
//           {/* Add more countries as needed */}
//         </select>
//         {error && 
//           <p className='text-sm text-red-500'>{error.message}</p>
//         }
//     </div>
//   )
// }

// export default CountrySelectField