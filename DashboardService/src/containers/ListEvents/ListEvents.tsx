import React from 'react';
import cls from './ListEvents.module.css';
import { IMetrics } from '../../context/metrics/metricsProvider';

const ListEvents = (props: IMetrics) => {
    const {
        kind,
        id,
        session_id,
        url,
        target_id,
        target_class,
        meta,
        created_on,
        domain,
    } = props;

    return (
        <div className={cls.EventWrapper}>
            <div className={cls.type}>
                Type of event: {kind}
            </div>
            <div className={cls.sesissionId}>
                SessionId:
                {session_id}
            </div>
            <div className={cls.url}>Url: {url}</div>
            <div className={cls.targetId}>
                Target id(element id or page url):{' '}
                {target_id}
            </div>
            <div className={cls.targetClass}>
                Target Class: {target_class}
            </div>
            <div className={cls.meta}>
                Additional Info {meta}
            </div>
        </div>
    );
};

export default ListEvents;
