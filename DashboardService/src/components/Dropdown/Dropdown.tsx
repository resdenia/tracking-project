import React, {
    useLayoutEffect,
    useRef,
    useState,
} from 'react';
import cls from './Dropdown.module.css';

export type Option = {
    name: string;
    value: string;
};
interface IDropdown {
    options: Option[];
    onChangeSelect: (value: string, name: string) => void;
    currentValue?: string;
    placeHolder?: string;
}

const Dropdown = (props: IDropdown) => {
    const {
        options,
        onChangeSelect,
        currentValue,
        placeHolder,
    } = props;
    const [openDropDown, setOpenDropDown] =
        useState<boolean>(false);

    const onOpen = () => {
        setOpenDropDown(true);
    };

    const onChangeSelectHandler = (
        value: string,
        name: string,
    ) => {
        onChangeSelect(value, name);
    };

    const renderOptions = () => {
        return options.map((option: Option) => {
            return (
                <li
                    className={cls.dropdownListEl}
                    key={option.name.replace(' ', '-')}
                    onClick={() => {
                        onChangeSelectHandler(
                            option.value,
                            option.name,
                        );
                    }}
                >
                    {option.name}
                </li>
            );
        });
    };

    const ref = useRef<HTMLDivElement>(null);

    const handleClickOutside = (event: Event) => {
        const target = event.target as HTMLDivElement;
        if (ref.current && !ref.current.contains(target)) {
            setOpenDropDown(false);
        }
    };
    useLayoutEffect(() => {
        document.addEventListener(
            'click',
            handleClickOutside,
            true,
        );
        return () => {
            document.removeEventListener(
                'click',
                handleClickOutside,
                true,
            );
        };
    }, []);
    return (
        <>
            <div
                data-testid="dropdownBtn"
                className={cls.LabelWrapper}
                ref={ref}
                onClick={onOpen}
            >
                {currentValue === '' ? (
                    placeHolder
                ) : (
                    <p
                        className={cls.current}
                        color="#f7c15c"
                    >
                        {currentValue}
                    </p>
                )}
            </div>
            <div
                data-testid="dropdownWrapper"
                className={`${
                    openDropDown
                        ? `${cls.DropdownList} ${cls.open}`
                        : cls.DropdownList
                }`}
            >
                {renderOptions()}
            </div>
        </>
    );
};

export default Dropdown;
