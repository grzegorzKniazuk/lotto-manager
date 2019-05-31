import { ApiResponseCodes } from 'src/app/shared/enums';

interface IErrorApiResponse {
    code: ApiResponseCodes;
    errno: number;
    index: number;
    message: string;
    name: string;
    parameters: string[];
    query: string;
    sql: string;
    sqlMessage: string;
    sqlState: number;
}

export type ErrorApiResponse = Readonly<IErrorApiResponse>;
