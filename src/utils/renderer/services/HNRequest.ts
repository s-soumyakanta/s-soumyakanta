/**
 * Example usage README.md#hnrequest
 */

type RequestOptions = Partial<RequestInit>;

type ResponseObject = {
	hasError: boolean;
	error?: object | string | null;
	data?: unknown; // Allow any type, overridden in JSON/Text types
};

type JSONResponseType = Omit<ResponseObject, 'data'> & {
	data?: object; // JSON responses must return an object
	message?: string;
};

type TextResponseType = Omit<ResponseObject, 'data'> & {
	data?: string; // Text responses must return a string
};

/**
 * HNRequest
 * A wrapper class to prepare, execute, and handle `.json()` and `.text()` responses safely.
 */
export class HNRequest {
	url: string;

	public rawResponse?: Response;

	public requestObj: Record<string, unknown> = {};

	public responseObj: ResponseObject = { hasError: false };

	private get hasError(): boolean {
		return this.responseObj.hasError;
	}

	private set hasError(status: boolean) {
		this.responseObj.hasError = status;
	}

	/**
	 * @param url - Request URL
	 * @param opts - Object of options for fetch()
	 */
	constructor(url: string, opts: RequestInit) {
		this.url = url;
		const { headers = {}, ...restOfTheOpts } = opts;
		this.requestObj = {
			method: 'GET',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				...(headers as Record<string, string>),
			},
			...restOfTheOpts,
		};
	}

	/**
	 * @param opts - RequestOptions - Fetch's Request type
	 * @returns void
	 */
	prepare = (opts: RequestOptions): void => {
		const { headers, body, ...restOfTheOptions } = opts;
		this.requestObj = {
			headers: headers as Record<string, string>,
			body: body ? JSON.stringify(body) : undefined,
			...restOfTheOptions,
		};
	};

	/**
	 * Makes the actual request and sets `rawResponse`.
	 * You can use the `rawResponse` property of the instance
	 * to handle the response manually.
	 * @returns void
	 */
	exec = async (): Promise<void> => {
		try {
			this.rawResponse = await fetch(this.url, this.requestObj as RequestInit);
		} catch (error) {
			this.responseObj.error = error instanceof Error ? error.message : String(error);
			this.hasError = true;
		}
	};

	/**
	 * Parses the response as JSON.
	 * @returns JSON response object.
	 */
	json = async (): Promise<JSONResponseType> => {
		if (this.hasError) {
			return this.responseObj as JSONResponseType;
		}

		try {
			const json = (await this.rawResponse?.json()) as JSONResponseType;
			this.responseObj = {
				...json,
				hasError: this.hasError,
			};
		} catch (error) {
			this.hasError = true;
			this.responseObj.error = error instanceof Error ? error.message : String(error);
		}
		return this.responseObj as JSONResponseType;
	};

	/**
	 * Parses the response as text.
	 * @returns Text response object.
	 */
	text = async (): Promise<TextResponseType> => {
		if (this.hasError) {
			return this.responseObj as TextResponseType;
		}

		try {
			this.responseObj.data = await this.rawResponse?.text();
		} catch (error) {
			this.hasError = true;
			this.responseObj.error = error instanceof Error ? error.message : String(error);
		}
		return this.responseObj as TextResponseType;
	};
}
