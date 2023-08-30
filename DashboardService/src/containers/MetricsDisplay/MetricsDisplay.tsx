import React, {
    memo,
    useCallback,
    useContext,
} from 'react';
import { MetricsContext } from '../../context/metrics/metricsContext';
import cls from './MetricsDisplay.module.css';
import ListEvents from '../ListEvents/ListEvents';

const MetricsDisplay = () => {
    const { metrics } = useContext(MetricsContext);

    const renderMetrics = () =>
        metrics.map((metric: any) => (
            <ListEvents key={metric.id} {...metric} />
        ));
    return (
        <div className={cls.MetricsDisplay}>
            {metrics.length === 0 ? (
                <div>No Metrics</div>
            ) : (
                <>
                    <h2>List of Events</h2>
                    <div className={cls.ListEvents}>
                        {renderMetrics()}
                    </div>
                </>
            )}
        </div>
    );
};

export default MetricsDisplay;
