import { formatDate } from './formatDate';

describe('formatDate', () => {
    it('should format a date string correctly', () => {
        const inputDate = '2023-08-28';
        const formattedDate = formatDate(inputDate);

        expect(formattedDate).toBe('2023-8-28');
    });
});