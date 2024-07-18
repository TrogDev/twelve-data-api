import { TimeSeriesResponseMeta } from "./time-series-response-meta";
import { TimeSeriesResponseValue } from "./time-series-response-value";

export interface TimeSeriesResponse {
    meta: TimeSeriesResponseMeta;
    values: Array<TimeSeriesResponseValue>
}
