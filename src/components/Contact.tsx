"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

const schema = yup.object().shape({
  name: yup.string().required("This field is required").min(1, "Minimum 1 character"),
  email: yup.string().required("This field is required").email("Invalid email format"),
  message: yup.string().required("This field is required").min(1, "Minimum 1 character"),
});


interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export default function Contact() {
  const { register, handleSubmit, formState: { errors }, reset, trigger } = useForm<ContactFormData>({
    resolver: yupResolver(schema)
  });
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const emailElement = document.getElementById("email") as HTMLInputElement;
    emailElement.addEventListener("change", () => {
      trigger("email");
    });
  }, [trigger]);

  const onSubmit: SubmitHandler<ContactFormData> = async (data) => {
    setLoading(true);
    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast({
          description: "Your message has been sent.",
        });
        reset();
      } else {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "Failed to send message.",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: `An error occurred. ${error}`,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-[hsl(var(--background))] dark:bg-[hsl(var(--background))] py-12 mt-12 px-4 mx-auto max-w-xl min-h-screen flex flex-col justify-center">
      <h2 className="mb-4 text-3xl md:text-4xl font-bold tracking-tight text-center text-black dark:text-white">
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
            {...register("name")}
            className={errors.name ? "border-red-600" : ""}
          />
          {errors.name && <span className="text-red-600">{errors.name.message}</span>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Your email</Label>
          <Input
            type="email"
            id="email"
            placeholder="Your email"
            {...register("email")}
            className={errors.email ? "border-red-600" : ""}
          />
          {errors.email && <span className="text-red-600">{errors.email.message}</span>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="message">Your message</Label>
          <Textarea
            id="message"
            rows={6}
            placeholder="Your message"
            {...register("message")}
            className={errors.message ? "border-red-600" : ""}
          />
          {errors.message && <span className="text-red-600">{errors.message.message}</span>}
        </div>
        <div className="flex justify-end">
          <Button type="submit" className="py-3 px-5 text-sm font-medium bg-white text-black" disabled={loading}>
            {loading ? "Sending..." : "Send message"}
          </Button>
        </div>
      </form>
    </section>
  );
}
