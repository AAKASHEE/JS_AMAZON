import { formatCurrency } from '../../scripts/utils/money.js';

describe('test suite:format Currency', () => {
    it('Converts Cents Into Dollars', () => {
        expect(formatCurrency(2095)).toEqual('20.95');
    });
    it('Works with 0', () => {
        expect(formatCurrency(0)).toEqual('0.00');
    });
    it('works with rounding Off', () => {
        expect(formatCurrency(2000.5)).toEqual('20.01');
    });
});

