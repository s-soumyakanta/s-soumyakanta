"use client";

import request from 'graphql-request';
import { useRef, useState } from 'react';
import {
	SubscribeToNewsletterDocument,
	SubscribeToNewsletterMutation,
	SubscribeToNewsletterMutationVariables,
	SubscribeToNewsletterPayload,
} from '../generated/graphql';
import { useAppContext } from './contexts/appContext';

const GQL_ENDPOINT = process.env.NEXT_PUBLIC_HASHNODE_GQL_ENDPOINT;

export const SubscribeForm = () => {
	const [status, setStatus] = useState<SubscribeToNewsletterPayload['status']>();
	const [requestInProgress, setRequestInProgress] = useState(false);
	const inputRef = useRef<HTMLInputElement>(null);
	const { publication } = useAppContext();

	const subscribe = async () => {
		const email = inputRef.current?.value;
		if (!email) return;

		setRequestInProgress(true);

		try {
			const data = await request<
				SubscribeToNewsletterMutation,
				SubscribeToNewsletterMutationVariables
			>(GQL_ENDPOINT, SubscribeToNewsletterDocument, {
				input: { publicationId: publication.id, email },
			});
			setRequestInProgress(false);
			setStatus(data.subscribeToNewsletter.status);
		} catch (error) {
			const message = (error as any).response?.errors?.[0]?.message;
			if (message) {
				window.alert(message);
			}
			setRequestInProgress(false);
		}
	};

	return (
		<div className="w-full max-w-3xl mx-auto my-4 sm:my-8 md:my-12 px-4 sm:px-6 md:px-0">
			<div className="overflow-hidden rounded-lg sm:rounded-xl shadow-md sm:shadow-lg border border-neutral-200 dark:border-neutral-700">
				<div className="px-4 sm:px-6 md:px-8 py-4 sm:py-6 bg-white dark:bg-neutral-950">
					<h3 className="mb-1 sm:mb-2 text-xl sm:text-2xl font-bold text-neutral-800 dark:text-white">
						Subscribe to the Newsletter
					</h3>
					<p className="mb-4 sm:mb-6 text-sm sm:text-base text-neutral-600 dark:text-neutral-300">
						Get the latest updates and articles delivered straight to your inbox.
					</p>

					{!status && (
						<div className="relative w-full rounded-lg bg-white p-1 shadow-inner dark:bg-neutral-900">
							<div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
								<input
									ref={inputRef}
									type="email"
									placeholder="Enter your email address"
									className="w-full h-12 sm:h-14 px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-neutral-800 bg-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:text-white"
								/>
								<button
									disabled={requestInProgress}
									onClick={subscribe}
									className="w-full sm:w-auto bg-white text-black transition-colors duration-200 rounded-lg px-4 sm:px-6 py-2 sm:py-3 font-medium disabled:cursor-not-allowed disabled:opacity-80 border border-neutral-200 dark:border-neutral-700  "
								>
									{requestInProgress ? (
										<span className="flex items-center justify-center">
											<svg className="animate-spin mr-2 h-4 w-4 text-neutral-600 dark:text-neutral-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
												<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
												<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
											</svg>
											Processing...
										</span>
									) : (
										"Subscribe"
									)}
								</button>
							</div>
						</div>
					)}

					{status === 'PENDING' && (
						<div className="p-3 sm:p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
							<div className="flex items-center space-x-2 sm:space-x-3 mb-1 sm:mb-2">
								<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
								</svg>
								<p className="font-bold text-green-700 dark:text-green-400">Almost there!</p>
							</div>
							<p className="text-sm sm:text-base font-medium text-neutral-700 dark:text-neutral-300">
								Check your inbox for a confirmation email and click{' '}
								<strong className="text-green-700 dark:text-green-400">
									"Confirm and Subscribe"
								</strong>{' '}
								to complete your subscription. Thanks for joining!
							</p>
						</div>
					)}

					<p className="mt-3 sm:mt-4 text-xs text-neutral-500 dark:text-neutral-400">
						Your privacy is respected. Unsubscribe at any time.
					</p>
				</div>
			</div>
		</div>
	);
};