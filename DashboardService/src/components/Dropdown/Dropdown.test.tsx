import React from 'react';
import Dropdown from './Dropdown';
import {
    render,
    screen,
    fireEvent,
} from '@testing-library/react';

jest.mock('../MoreIcon/Icon', () => ({
    MoreIcon: jest.fn(() => null),
}));

describe('Dropdown Component', () => {
    const options = [
        { name: 'Option 1', value: 'value1' },
        { name: 'Option 2', value: 'value2' },
    ];

    const onChangeSelect = jest.fn();

    it('renders dropdown button', () => {
        render(
            <Dropdown
                options={options}
                onChangeSelect={onChangeSelect}
            />,
        );
        const button = screen.getByTestId('dropdownBtn');

        expect(button).toBeInTheDocument();
    });

    it('opens dropdown menu on click', () => {
        render(
            <Dropdown
                options={options}
                onChangeSelect={onChangeSelect}
            />,
        );
        const button = screen.getByTestId('dropdownBtn');

        fireEvent.click(button);

        const option1 = screen.getByText('Option 1');
        const option2 = screen.getByText('Option 2');

        expect(option1).toBeInTheDocument();
        expect(option2).toBeInTheDocument();
    });

    it('calls onChangeSelect when an option is clicked', () => {
        render(
            <Dropdown
                options={options}
                onChangeSelect={onChangeSelect}
            />,
        );
        const button = screen.getByTestId('dropdownBtn');

        fireEvent.click(button);

        const option1 = screen.getByText('Option 1');
        fireEvent.click(option1);

        expect(onChangeSelect).toHaveBeenCalledWith(
            'value1',
        );
    });

    it('closes dropdown when clicking outside', () => {
        render(
            <Dropdown
                options={options}
                onChangeSelect={onChangeSelect}
            />,
        );
        const button = screen.getByTestId('dropdownBtn');

        fireEvent.click(button);

        const outsideElement = document.body; // Clicking outside the dropdown

        fireEvent.click(outsideElement);

        const className = screen
            .getByTestId('dropdownWrapper')
            .getAttribute('class');

        expect(className).toBe('DropdownList');
    });
});
