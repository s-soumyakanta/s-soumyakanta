type Props = {
    title?: string;
    message?: string;
};

// Shared fallback for blog listing pages when the Hashnode API is unreachable
// (e.g. down, rate-limited, or access has lapsed) so a fetch failure degrades
// to a friendly message instead of crashing the page — or the build, since
// these pages are statically generated.
export function BlogUnavailable({
    title = 'Unable to Load Blog',
    message = 'There was an error loading this content. Please try again later.',
}: Props) {
    return (
        <div className="max-w-4xl px-4 py-8 mx-auto mt-20 text-center">
            <div className="max-w-md mx-auto">
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-8">
                    <svg className="mx-auto h-12 w-12 text-red-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h3 className="text-lg font-medium text-red-800 dark:text-red-200 mb-2">{title}</h3>
                    <p className="text-red-600 dark:text-red-300">{message}</p>
                </div>
            </div>
        </div>
    );
}
