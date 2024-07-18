import { AxiosResponse, Method } from "axios";

export interface TwelveDataRequest<TResponse> {
    method: Method;
    endpoint: string;
    query: Record<string, string>;

    parseResponse(rawResponse: AxiosResponse<any>): TResponse;
}
