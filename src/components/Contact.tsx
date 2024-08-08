"use client";

import { Button } from "./ui/button";

export default function Contact() {
  return (
    <section className="bg-[hsl(var(--background))] dark:bg-[hsl(var(--background))] py-8 mt-14 px-4 mx-auto max-w-3xl h-screen flex flex-col justify-center">
      <h2 className="mb-4 text-3xl md:text-4xl font-bold tracking-tight text-center text-gray-900 dark:text-white">
        Contact Me
      </h2>
      <p className="mb-8 font-light text-center text-gray-500 dark:text-gray-400 sm:text-lg">
        Want to discuss a tech project or need a full-stack developer to create a website for you? Let me know.
      </p>
      <form action="#" className="space-y-5">
        <div>
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Your email
          </label>
          <input
            type="email"
            id="email"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
            placeholder="name@domain.com"
            required
          />
        </div>
        <div>
          <label
            htmlFor="subject"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Subject
          </label>
          <input
            type="text"
            id="subject"
            className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
            placeholder="Let me know how I can help you"
            required
          />
        </div>
        <div>
          <label
            htmlFor="message"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Your message
          </label>
          <textarea
            id="message"
            rows={6}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            placeholder="Leave a comment..."
          ></textarea>
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
