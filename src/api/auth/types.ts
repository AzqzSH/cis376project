export type User = {
	id: string;
	email: string;
	lastLogin: Date;
};

export type SignInResponse = {
	accessToken: string;
	refreshToken: string;
};
