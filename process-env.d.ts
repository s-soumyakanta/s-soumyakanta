declare namespace NodeJS {
	interface ProcessEnv {
		[key: string]: string | undefined;
		// add more environment variables and their types here
	}
}
