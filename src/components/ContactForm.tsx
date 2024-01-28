'use client'
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Input from './Input';

type FormValues = {
  name: string;
  email: string;
  message: string;
};

const ContactForm: React.FC = () => {
  const [formValues, setFormValues] = useState<FormValues>({
    name: '',
    email: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormValues>({
    name: '',
    email: '',
    message: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let isValid = true;
    const newErrors: FormValues = { name: '', email: '', message: '' };

    if (!formValues.name.trim()) {
      isValid = false;
      newErrors.name = 'Name is required';
    }

    if (!formValues.email.trim()) {
      isValid = false;
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formValues.email.trim())) {
      isValid = false;
      newErrors.email = 'Invalid email format';
    }

    if (!formValues.message.trim()) {
      isValid = false;
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);

    if (isValid) {
        const response = await fetch("/api/users/send",{
            method:"POST",
            headers:{
              "Content-type":"application/json",
            },
            body:JSON.stringify(formValues)
          })
          if(response.status === 200){
            setFormValues({
              name: "",
              email:"",
              message:"" 
            })
            toast.success('Form submitted successfully!')
          }
        }
        else{
            toast.warn('Please fill in the required fields.');
        }
    } 

  return (
      <form onSubmit={handleSubmit} className='md:w-2/5 w-full bg-gray-100 dark:bg-slate-950  border-gray-200 dark:border-gray-50 shadow-lg border-2 dark:border  p-4 rounded-lg'>
        <Input
          type="text"
          id="name"
          name="name"
          label="Name"
          value={formValues.name}
          error={errors.name}
          onChange={handleInputChange}
        />

        <Input
          type="email"
          id="email"
          name="email"
          label="Email"
          value={formValues.email}
          error={errors.email}
          onChange={handleInputChange}
        />

        <div className="mb-4 space-y-4">
          <label htmlFor="message" className="dark:text-dm-heading text-lm-heading">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formValues.message}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border dark:bg-lm-heading ${errors.message && 'border-red-500'} rounded`}
          />
          {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
        </div>

        <button
          type="submit"
          className=" bg-dm-bg text-lg rounded-md uppercase text-dm-heading dark:text-lm-heading dark:bg-dm-heading px-5 p-2"
        >
          Submit
        </button>

        {/* Toast container for displaying messages */}
        <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />
      </form>
  );
};

export default ContactForm;
