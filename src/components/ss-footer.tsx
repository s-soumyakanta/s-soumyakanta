import CurrentYear from "./cureent-year";

export default function SSFooter() {
    return (
        <footer className="border-t border-[hsl(var(--border))] bg-[hsl(var(--background))]">
            <div className="container mx-auto p-4 py-6">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                    &copy; <CurrentYear /> S Soumyakanta
                </span>
            </div>
        </footer>
    );
}
