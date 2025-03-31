export const triggerCustomWidgetEmbed = async (pubId) => {
	const frames = document.querySelectorAll('.hn-embed-widget');
	if (frames.length === 0) return;

	const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || '';
	const host = window.location.hostname;

	Array.from(frames).forEach(async (frame) => {
		try {
			const iframe = document.createElement('iframe');
			iframe.id = `frame-${frame.id}`;
			iframe.sandbox =
				'allow-same-origin allow-forms allow-presentation allow-scripts allow-popups';
			iframe.src =
				host.indexOf('.hashnode.net') !== -1 || host.indexOf('.app.localhost') !== -1
					? `${baseUrl}/api/pub/${pubId}/embed/${frame.id}`
					: `https://embeds.hashnode.co?p=${pubId}&w=${frame.id}`;
			iframe.width = '100%';

			// Clear existing content and append new iframe
			frame.innerHTML = '';
			frame.appendChild(iframe);
			frame.classList.add('hn-embed-widget-expanded');

			// Ensure iFrameResize is available before using it
			setTimeout(() => {
				if (typeof window !== 'undefined' && window.iFrameResize) {
					window.iFrameResize({ log: false, autoResize: true }, `#${iframe.id}`);
				} else {
					console.warn('iFrameResize is not available');
				}
			}, 1000);
		} catch (error) {
			console.error('Error embedding widget:', error);
		}
	});
};
