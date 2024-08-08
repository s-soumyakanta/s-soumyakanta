"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default function Contact() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data: any) => {
    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert('Message sent successfully!');
      } else {
        alert('Failed to send message.');
      }
    } catch (error) {
      alert('An error occurred.');
    }
  };

  return (
    <section className="bg-[hsl(var(--background))] dark:bg-[hsl(var(--background))] py-8 mt-10 px-4 mx-auto max-w-xl h-screen flex flex-col justify-center">
      <h2 className="mb-4 text-3xl md:text-4xl font-bold tracking-tight text-center text-gray-900 dark:text-white">
        Contact
      </h2>
      <p className="mb-8 font-light text-center text-gray-500 dark:text-gray-400 sm:text-sm text-lg">
        Want to discuss a tech project or need a full-stack developer to create a website for you? Let me know.
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="name">Your name</Label>
          <Input
            type="text"
            id="name"
            placeholder="Your name"
            {...register("name", { required: true })}
            className={errors.name ? "border-red-600" : ""}
          />
          {errors.name && <span className="text-red-600">This field is required</span>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Your email</Label>
          <Input
            type="email"
            id="email"
            placeholder="Your email"
            {...register("email", { required: true })}
            className={errors.email ? "border-red-600" : ""}
          />
          {errors.email && <span className="text-red-600">This field is required</span>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="message">Your message</Label>
          <Textarea
            id="message"
            rows={6}
            placeholder="Your message"
            {...register("message", { required: true })}
            className={errors.message ? "border-red-600" : ""}
          />
          {errors.message && <span className="text-red-600">This field is required</span>}
        </div>
        <div className="flex justify-end">
          <Button type="submit" className="py-3 px-5 text-sm font-medium">
            Send message
          </Button>
        </div>
      </form>
    </section>
  );
}
