"use client";

import { useEffect, useState } from "react"

export function useCurrentYear() {
    const [currentYear, setCurrentYear] = useState<number>(
        () => new Date().getFullYear()
    )

    useEffect(() => {
        setCurrentYear(new Date().getFullYear())
    }, [])

    return currentYear
}
