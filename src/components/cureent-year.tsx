"use client";

import { useCurrentYear } from "@/hooks/getCurrentYear";

const CurrentYear = () => {
    const currentYear = useCurrentYear();
    return currentYear
}

export default CurrentYear