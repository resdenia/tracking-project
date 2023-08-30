import {
    GET_METRICS,
    GET_DOMAINS,
    SET_DOMAIN
} from '../types';
import { IInitialState, IMetrics, IDomain } from './metricsProvider'

type Action =
    | { type: 'GET_METRICS', payload: IMetrics[] }
    | { type: 'GET_DOMAINS', payload: IDomain[] }
    | { type: 'SET_DOMAIN', payload: string }

export const metricsReducer = (state: IInitialState, action: Action) => {

    switch (action.type) {
        case GET_METRICS:
            return action.payload.length > 0 ? {
                ...state,
                metrics: [...action.payload]
            } : {
                ...state
            }
        case SET_DOMAIN:
            return {

                ...state,
                domain: action.payload

            }
        case GET_DOMAINS:
            return action.payload.length > 0 ? {
                ...state,
                domains: [...action.payload]
            } : {
                ...state
            }


        default:
            return state;
    }
};
