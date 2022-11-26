import React from 'react'
import { useFormikContext } from "formik";


const InputField = ({input, type, value, info, required, ...props}) => {
    const { values, errors, handleChange, handleBlur, touched} = useFormikContext();

    required = required === undefined ? false:required 
    
    return (
      <div className={`${props.className} flex flex-col mb-6`}>
        <label
          className="block grow-0 text-gray-500 font-bold px-2"
          htmlFor={value}
        >
          {input} {required && <span className="text-red-500">*</span>}
        </label>
        <p className="text-gray-500 text-xs italic pt-0.5 pb-1 pl-2 font-semibold">
          {info === undefined ? <span className="block pt-0.5 pb-1 pl-2 h-4"></span>:info}
        </p>
        <input
          className="border-b-2 appearance-none mr-10 px-2 py-1 border-gray-300 border-2 bg-slate-100 rounded-sm text-gray-700 focus:outline-none focus:bg-white focus:border-b-gray-500 focus:border-transparent"
          type={type}
          name={value}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values[value]}
          placeholder={props.placeholder}
        />
        <p className="text-red-500 text-xs italic pt-2 font-semibold">
          {errors[value] && touched[value] && errors[value]}
        </p>
      </div>
    );
  };

  const FileInputField = ({input, type, value, info, required, ...props}) => {
    const { values, errors, handleChange, handleBlur, touched, setFieldValue} = useFormikContext();

    required = required === undefined ? false:required 
    
    return (
      <div className={`${props.className} flex flex-col mb-6`}>
        <label
          className="block grow-0 text-gray-500 font-bold px-2"
          htmlFor={value}
        >
          {input} {required && <span className="text-red-500">*</span>}
        </label>
        <p className="text-gray-500 text-xs italic pt-0.5 pb-1 pl-2 font-semibold">
          {info === undefined ? <span className="block pt-0.5 pb-1 pl-2 h-4"></span>:info}
        </p>
        <input
          className="border-b-2 appearance-none mr-10 px-2 py-1 border-gray-300 border-2 bg-slate-100 rounded-sm text-gray-700 focus:outline-none focus:bg-white focus:border-b-gray-500 focus:border-transparent"
          type={type}
          name={value}
          onChange={(event) => setFieldValue(value, event.target.files[0])}
          onBlur={handleBlur}
        />
        <p className="text-red-500 text-xs italic pt-2 font-semibold">
          {errors[value] && touched[value] && errors[value]}
        </p>
      </div>
    );
  };

export {InputField, FileInputField}