interface IErrorApiResponse {
    code: string;
    message: string;
    statusCode: number;
}

export type ErrorApiResponse = Readonly<IErrorApiResponse>;
