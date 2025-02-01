"use client";

import { useState, useEffect } from "react";
import { getPost, SinglePost } from "@/queries/blog-data";

interface UseHashnodePostDetailsSettings {
    host: string;
    slug: string;
}

interface UseHashnodePostDetailsReturn {
    loading: boolean;
    error: Error | null;
    post: SinglePost | null;
}

export function useHashnodePostDetails(
    settings: UseHashnodePostDetailsSettings
): UseHashnodePostDetailsReturn {
    const [post, setPost] = useState<SinglePost | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);

    const { host, slug } = settings;

    useEffect(() => {
        const fetchPostDetails = async () => {
            try {
                setLoading(true);
                const data = await getPost(host, slug);
                if (data) {
                    setPost(data);
                }
            } catch (err) {
                if (err instanceof Error) {
                    setError(err);
                } else {
                    setError(new Error("An unknown error occurred"));
                }
            } finally {
                setLoading(false);
            }
        };

        fetchPostDetails();
    }, [host, slug]);

    return { loading, error, post };
}
