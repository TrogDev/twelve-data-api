import axios from "axios";
import { TwelveDataRequest } from "./interfaces/twelve-data-request"

export class TwelveDataClient {
    private apiKey: string;
    private baseUri: string;

    public constructor(apiKey: string) {
        this.apiKey = apiKey;
        this.baseUri = "https://api.twelvedata.com";
    }

    public async execute<TResponse>(request: TwelveDataRequest<TResponse>): Promise<TResponse> {
        const uri = this.getUri(request.endpoint, request.query);

        let rawResponse  = await axios({
            method: request.method,
            url: uri
        })

        return request.parseResponse(rawResponse);
    }

    private getUri(endpoint: string, query: Record<string, string>): string {
        let uri = new URL(this.baseUri + endpoint);

        query["apikey"] = this.apiKey;

        for (let key in query) {
            uri.searchParams.append(key, query[key]);
        }

        return uri.href;
    }
}
