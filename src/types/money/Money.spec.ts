import Money from './Money';

describe('Money', () => {
  beforeEach(() => {});

  it('formats number correctly', () => {
    const zero = new Money(0n, 'GBP');
    expect(zero.valueFormattedAsIntegralAndFraction).toBe('0.00');

    const fiftyP = new Money(50n, 'GBP');
    expect(fiftyP.valueFormattedAsIntegralAndFraction).toBe('0.50');

    const ninetyNineP = new Money(99n, 'GBP');
    expect(ninetyNineP.valueFormattedAsIntegralAndFraction).toBe('0.99');

    const aQuid = new Money(1_00n, 'GBP');
    expect(aQuid.valueFormattedAsIntegralAndFraction).toBe('1.00');

    const threeQuid = new Money(3_00n, 'GBP');
    expect(threeQuid.valueFormattedAsIntegralAndFraction).toBe('3.00');

    const tenner = new Money(10_00n, 'GBP');
    expect(tenner.valueFormattedAsIntegralAndFraction).toBe('10.00');

    const grand = new Money(1000_00n, 'GBP');
    expect(grand.valueFormattedAsIntegralAndFraction).toBe('1000.00');
  });

  it('adds correctly', () => {
    const fiftyP = new Money(50n, 'GBP');
    const ninetyNineP = new Money(99n, 'GBP');
    expect(fiftyP.add(ninetyNineP).valueFormattedAsIntegralAndFraction).toBe('1.49');
    expect(fiftyP.valueFormattedAsIntegralAndFraction).toBe('0.50'); // check immutability

    const grand = new Money(1000_00n, 'GBP');
    expect(fiftyP.add(grand).valueFormattedAsIntegralAndFraction).toBe('1000.50');
  });
});
