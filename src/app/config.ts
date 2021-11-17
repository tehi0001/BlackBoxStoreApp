export const API_URL = "https://api.blackbox.stage.timothyehimen.com"; //Live url: https://api.blackbox.stage.timothyehimen.com
export const  NETWORK_ERROR_MESSAGE: string = "A network error occurred. Please try again";
export const SERVER_ERROR_MESSAGE: string = "An unknown server error occurred";
export const SESSION_UNAUTHORIZED_MESSAGE: string = "Session Unauthorized";
export const NEW_ARRIVALS_LIMIT: number = 6;

export const PROVINCES: any = [
	{
		code: "EC",
		name: "Eastern Cape"
	},
	{
		code: "FS",
		name: "Free State"
	},
	{
		code: "GP",
		name: "Gauteng"
	},
	{
		code: "KZN",
		name: "KwaZulu-Natal"
	},
	{
		code: "LP",
		name: "Limpopo"
	},
	{
		code: "MP",
		name: "Mpumalanga"
	},
	{
		code: "NC",
		name: "Northern Cape"
	},
	{
		code: "NW",
		name: "North West"
	},
	{
		code: "WC",
		name: "Western Cape"
	}
]

export const EMAIL_VALIDATION_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
