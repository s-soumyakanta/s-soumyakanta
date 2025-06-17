// app/resume/page.tsx
import { FileText, Download } from "lucide-react";

export default function ResumePage() {
    return (
        <main className="min-h-screen bg-black text-white flex flex-col items-center justify-start p-4 sm:p-6 pt-20 pb-20 sm:pt-28 sm:pb-28">
            {/* Header Section */}
            <div className="w-full max-w-6xl text-center mb-6 sm:mb-8">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4 flex items-center justify-center gap-3">
                    <FileText className="w-8 h-8 sm:w-10 sm:h-10" />
                    My Resume
                </h1>

                <p className="mb-4 sm:mb-6 text-gray-300 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto px-2">
                    View my up-to-date resume below. You can also download it directly using the button.
                </p>

                {/* Download Button */}
                <div className="mb-6 sm:mb-8">
                    <a
                        href="https://docs.google.com/document/d/1jsNj898c_OoIJCVfycJL84F5egtdjwNAIly18KXA-So/export?format=pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-white hover:bg-gray-200 text-black font-semibold py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg shadow-lg transition-all duration-200 hover:scale-105 text-sm sm:text-base"
                    >
                        <Download className="w-4 h-4 sm:w-5 sm:h-5" />
                        Download Resume (PDF)
                    </a>
                </div>
            </div>

            {/* Resume Viewer Container */}
            <div className="w-full max-w-6xl flex-1 bg-black rounded-lg shadow-2xl overflow-hidden border border-black">
                {/* Mobile: 4:3 aspect ratio */}
                <div className="relative w-full pb-[75%] sm:pb-[70%] lg:pb-[60%] xl:pb-[56.25%]">
                    <iframe
                        src="https://docs.google.com/document/d/1jsNj898c_OoIJCVfycJL84F5egtdjwNAIly18KXA-So/preview"
                        className="absolute top-0 left-0 w-full h-full rounded-lg min-h-[500px]"
                        title="Resume Preview"
                    />
                </div>
            </div>
        </main>
    );
}