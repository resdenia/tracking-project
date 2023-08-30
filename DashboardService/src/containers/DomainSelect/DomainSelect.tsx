import React, {
    memo,
    useContext,
    useEffect,
    useState,
} from 'react';
import cls from './DomainSelect.module.css';
import Dropdown from '../../components/Dropdown/Dropdown';
import { MetricsContext } from '../../context/metrics/metricsContext';

export type Option = {
    name: string;
    value: string;
};
export type Domain = {
    id: string;
    domain: string;
};
const DomainSelect = () => {
    const [options, setOptions] = useState<Option[]>([]);
    const [currentValue, setCurrentValue] =
        useState<string>('');

    const { setDomain, domains } =
        useContext(MetricsContext);

    useEffect(() => {
        const options: Option[] = [];

        domains.forEach((domain: Domain) => {
            const findIndex = options.findIndex(
                (option) => option.name === domain.domain,
            );
            if (findIndex === -1) {
                options.push({
                    name: domain.domain,
                    value: domain.id,
                });
            }
        });
        setOptions([...options]);
    }, [domains]);

    const onSetDomain = (id: string, name: string) => {
        setDomain(name);
        setCurrentValue(name);
    };

    return (
        <div className={cls.DomainSelect}>
            <Dropdown
                onChangeSelect={onSetDomain}
                options={options}
                currentValue={currentValue}
                placeHolder={
                    'Please choose domain to see dashboard'
                }
            />
        </div>
    );
};

export default DomainSelect;
