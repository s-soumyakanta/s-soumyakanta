"use client";

import Cookies from "js-cookie";
import { useEffect, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";

import { useAppContext } from "./contexts/appContext";

const GA_TRACKING_ID = "G-72XG3F8LNJ"; // This is Hashnode's GA tracking ID
const isProd = process.env.NEXT_PUBLIC_MODE === "production";
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_URL || "";

export const Analytics = () => {
	const { publication, post, series, page } = useAppContext();

	const _sendPageViewsToHashnodeGoogleAnalytics = useCallback(() => {
		window.gtag("config", GA_TRACKING_ID, {
			transport_url: "https://ping.hashnode.com",
			first_party_collection: true,
		});
	}, []);

	const _sendViewsToHashnodeInternalAnalytics = useCallback(async () => {
		if (!publication?.id) return;

		const event: Record<string, string | number | object> = {
			event_type: "pageview",
			time: Date.now(),
			event_properties: {
				hostname: window.location.hostname,
				url: window.location.pathname,
				eventType: "pageview",
				publicationId: publication.id,
				dateAdded: Date.now(),
				referrer: document.referrer,
			},
		};

		let deviceId = Cookies.get("__amplitudeDeviceID");
		if (!deviceId) {
			deviceId = uuidv4();
			Cookies.set("__amplitudeDeviceID", deviceId, { expires: 365 * 2 });
		}

		event["device_id"] = deviceId;

		await fetch(`${BASE_PATH}/ping/data-event`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ events: [event] }),
		});
	}, [publication]);

	const _sendViewsToAdvancedAnalyticsDashboard = useCallback(() => {
		if (!publication?.id) {
			console.warn("Publication ID is missing; could not send analytics.");
			return;
		}

		const postId = post?.id;
		const seriesId = series?.id || post?.series?.id;
		const staticPageId = page?.id;

		const event = {
			payload: {
				publicationId: publication.id,
				postId: postId || null,
				seriesId: seriesId || null,
				pageId: staticPageId || null,
				url: window.location.href,
				referrer: document.referrer || null,
				language: navigator.language || null,
				screen: `${window.screen.width}x${window.screen.height}`,
			},
			type: "pageview",
		};

		const blob = new Blob([JSON.stringify({ events: [event] })], {
			type: "application/json; charset=UTF-8",
		});

		let hasSentBeacon = false;
		try {
			if (navigator.sendBeacon) {
				hasSentBeacon = navigator.sendBeacon(`${BASE_PATH}/api/analytics`, blob);
			}
		} catch (error) {
			console.error("Error sending beacon:", error);
		}

		if (!hasSentBeacon) {
			fetch(`${BASE_PATH}/api/analytics`, {
				method: "POST",
				body: blob,
				credentials: "omit",
				keepalive: true,
			});
		}
	}, [publication, post, series, page]);

	useEffect(() => {
		if (!isProd) return;

		_sendPageViewsToHashnodeGoogleAnalytics();
		_sendViewsToHashnodeInternalAnalytics();
		_sendViewsToAdvancedAnalyticsDashboard();
	}, [
		_sendPageViewsToHashnodeGoogleAnalytics,
		_sendViewsToHashnodeInternalAnalytics,
		_sendViewsToAdvancedAnalyticsDashboard,
	]);

	return null;
};
