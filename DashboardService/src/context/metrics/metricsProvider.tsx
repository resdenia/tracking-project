import React, {
    useReducer,
    useCallback,
    FunctionComponent,
    useMemo,
} from 'react';

import { MetricsContext } from './metricsContext';
import { metricsReducer } from './metricsReducer';
import {
    GET_DOMAINS,
    GET_METRICS,
    SET_DOMAIN,
} from '../types';

interface IProps {
    children: React.ReactNode;
}

export interface IMetrics {
    kind: string;
    id: string;
    session_id: string;
    url: string;
    target_id: string;
    target_class: string;
    meta: string;
    created_on: string;
    domain: string;
}

export interface IDomain {
    domain: string;
    id: string;
}

export interface IInitialState {
    metrics: IMetrics[];
    domains: IDomain[];
    domain: string | null;
}

const BASE_URL = process.env.REACT_APP_API;

export const MetricsProvider: FunctionComponent<IProps> = ({
    children,
}) => {
    const initialState: IInitialState = {
        metrics: [],
        domains: [],
        domain: null,
    };

    const [state, dispatch] = useReducer(
        metricsReducer,
        initialState,
    );

    const getMetrics = async () => {
        try {
            const response = await fetch(
                `${BASE_URL}metrics-all`,
            );

            const metrics = await response.json();
            dispatch({
                type: GET_METRICS,
                payload: [...metrics.data],
            });
        } catch (e) {
            console.log(e);
        }
    };

    const getDomains = async () => {
        try {
            const response = await fetch(
                `${BASE_URL}get-domains`,
            );
            const domains = await response.json();
            dispatch({
                type: GET_DOMAINS,
                payload: [...domains.data],
            });
        } catch (e) {
            console.log(e);
        }
    };

    const setDomain = async (domain: string) => {
        try {
            dispatch({
                type: SET_DOMAIN,
                payload: domain,
            });
            const response = await fetch(
                `${BASE_URL}domain-metrics/?domain=${domain}`,
            );
            const metrics = await response.json();
            dispatch({
                type: GET_METRICS,
                payload: [...metrics.data],
            });
            console.log(metrics);
        } catch (e) {
            console.log(e);
        }
    };

    const value = useMemo(
        () => ({
            metrics: state.metrics,
            domains: state.domains,
            getMetrics,
            setDomain,
            getDomains,
        }),
        [state],
    );

    return (
        <MetricsContext.Provider value={value}>
            {children}
        </MetricsContext.Provider>
    );
};
