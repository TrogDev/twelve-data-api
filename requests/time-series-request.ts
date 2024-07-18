import { Method, AxiosResponse } from "axios";
import { TwelveDataRequest } from "../interfaces/twelve-data-request";
import { TimeSeriesResponse } from "../structures/time-series-response";
import { Interval } from "../enums/intervals";

export class TimeSeriesRequest implements TwelveDataRequest<Record<string, TimeSeriesResponse>> {
    method: Method;
    endpoint: string;
    query: Record<string, string>;
    isManySymbols: boolean;
    
    public constructor(
        symbols: Array<string>,
        startDate: Date,
        endDate: Date,
        interval: Interval = Interval.Min1,
        exchange: string = "NASDAQ"
    ) {
        this.method = "get";
        this.endpoint = "/time_series"
        this.query = {
            "symbol": symbols.join(","),
            "start_date": startDate.toString(),
            "end_date": endDate.toString(),
            "interval": interval,
            "exchange": exchange
        }

        this.isManySymbols = symbols.length > 1;
    }

    parseResponse(rawResponse: AxiosResponse<any>): Record<string, TimeSeriesResponse> {
        if (this.isManySymbols) {
            return <Record<string, TimeSeriesResponse>>rawResponse.data
        }
        else {
            let response = <TimeSeriesResponse>rawResponse.data;
            let symbol = response.meta.symbol;
            return {
                [symbol]: response
            }
        }
    }
}