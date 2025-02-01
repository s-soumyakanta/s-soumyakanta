"use client";

import { useCurrentYear } from "@/hooks/getCurrentYear";

const CurrentYear = () => {
    const currentYear = useCurrentYear();
    return (
        <p>{currentYear}</p>
    )
}

export default CurrentYear