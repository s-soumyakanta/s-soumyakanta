import { DEFAULT_AVATAR } from './consts/images';

const DEFAULT_PHOTO = `${DEFAULT_AVATAR},format&format=webp`;

interface ResizeOptions {
	w?: number;
	h?: number;
	mask?: string;
	'corner-radius'?: string;
	fill?: string;
	c?: string;
	q?: string;
}

const resizeImage = (src: string | null, resize: ResizeOptions, defaultImage: string = DEFAULT_PHOTO): string => {
	if (!src) {
		return defaultImage;
	}

	// Handle special case
	if (src === '?sz=200') {
		return DEFAULT_PHOTO;
	}

	let newSrc = src.replace('hashnode.imgix.net', 'cdn.hashnode.com');

	if (src.includes('//res.cloudinary.com/hashnode') && src.includes('/upload/')) {
		const parts = src.split('/upload/');
		const format = parts[1].substring(parts[1].lastIndexOf('.') + 1);

		if (parts[1].includes('ama_banners')) {
			const version = parts[1].substring(1, parts[1].indexOf('/'));
			const path = parts[1].substring(parts[1].indexOf('/') + 1, parts[1].lastIndexOf('.'));
			newSrc = `${parts[0]}/upload/${path}/${version}.${format}?auto=compress,format&format=webp`;
		} else {
			const nextParts = parts[1].split('/');
			if (nextParts[0].startsWith('v')) {
				nextParts[0] = nextParts[0].substring(1);
			}
			newSrc = `${parts[0]}/upload/${nextParts[1].substring(0, nextParts[1].lastIndexOf('.'))}/${nextParts[0]}.${format}?auto=compress,format&format=webp`;
		}
		newSrc = newSrc.replace('//res.cloudinary.com', '//cdn.hashnode.com/res').replace('http://', 'https://');
	} else if (src.includes('//cdn.hashnode.com') && src.includes('/upload/')) {
		const parts = src.split('/upload/');
		if (!parts[1].startsWith('v')) {
			newSrc = `${parts[0]}/upload/${parts[1].substring(parts[1].indexOf('/') + 1)}`;
		}
	}

	if (!newSrc.includes('//cdn.hashnode.com')) {
		return newSrc;
	}

	let opts = '';
	Object.keys(resize).forEach((prop) => {
		if (prop === 'w' || prop === 'h' || prop === 'mask' || prop === 'corner-radius') {
			opts += `${prop}=${resize[prop as keyof ResizeOptions]}&`;
		} else if (prop === 'fill') {
			opts += `fit=fill&fill=${resize[prop as keyof ResizeOptions]}&`;
		} else if (prop === 'c') {
			opts += `fit=crop&crop=${resize[prop as keyof ResizeOptions] === 'face' ? 'faces' : 'entropy'}&`;
		}
	});

	if (resize.q === 'none') {
		return `${newSrc}?${opts}`;
	}

	if (newSrc.includes('?')) {
		const newSrcSplit = newSrc.split('?');
		newSrc = newSrcSplit[0];
		opts += newSrcSplit[1].endsWith('&') ? newSrcSplit[1] : `${newSrcSplit[1]}&`;
	}

	opts += src.includes('.gif') ? 'auto=format,compress&gif-q=60&format=webm' : 'auto=compress,format&format=webp';

	return `${newSrc}?${opts}`;
};

const imageReplacer = (content: string, lazyLoad: boolean = false): string => {
	const regex = /<img src="([^"]+)"/g;
	const srcVals = content.match(regex);

	if (!srcVals) {
		return content;
	}

	const map: Record<string, string> = {};
	srcVals.forEach((src) => {
		const cleanSrc = src.split('src=')[1].replace(/"/g, '');
		map[cleanSrc] = resizeImage(cleanSrc, {});
	});

	Object.keys(map).forEach((oldSrc) => {
		content = content.replace(oldSrc, map[oldSrc]);
	});

	if (lazyLoad) {
		content = content.replace(/<img/g, '<img loading="lazy"');
	}

	return content;
};

const getBlurHash = (src: string | null): string => {
	if (!src) return '';
	return src.includes('?') ? `${src}&fm=blurhash` : `${src}?fm=blurhash`;
};

enum ImageAlignment {
	Center = 'center',
	Left = 'left',
	Right = 'right',
}

export { resizeImage, imageReplacer, getBlurHash, ImageAlignment };
