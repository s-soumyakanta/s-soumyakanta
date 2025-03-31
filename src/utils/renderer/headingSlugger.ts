import sanitizeHtml from 'sanitize-html';
import slug from 'slug';

export class HeadingSlugger {
	private headings: Record<string, number>;

	constructor() {
		this.headings = {};
	}

	static sanitizeSlug(str: string): string {
		return slug(sanitizeHtml(str, { allowedTags: [] }), { lower: true });
	}

	private doesHeadingExist(slug: string): boolean {
		return Object.prototype.hasOwnProperty.call(this.headings, slug);
	}

	private findSafeSlug(originalSlug: string): string {
		if (!this.doesHeadingExist(originalSlug)) {
			this.headings[originalSlug] = 0;
			return originalSlug;
		}

		let duplicateCount = this.headings[originalSlug];
		let modifiedSlug: string;

		do {
			duplicateCount += 1;
			modifiedSlug = `${originalSlug}-${duplicateCount}`;
		} while (this.doesHeadingExist(modifiedSlug));

		this.headings[modifiedSlug] = 0;
		this.headings[originalSlug] += 1;
		return modifiedSlug;
	}

	public getSlug(str: string): string {
		const sanitizedSlug = HeadingSlugger.sanitizeSlug(str);
		return this.findSafeSlug(sanitizedSlug);
	}
}
