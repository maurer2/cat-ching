import Money from './Money';

describe('Money', () => {
  beforeEach(() => {});

  // removed getters
  it.skip('works correctly with numbers', () => {
    const zero = Money.fromNumber(0, 'GBP');
    expect(typeof zero.value).toBe('bigint');
    expect(zero.value).toBe(0n);
    expect(typeof zero.valueAsNumber).toBe('number');
    expect(zero.valueAsNumber).toBe(0);

    const fiftyP = Money.fromNumber(50, 'GBP');
    expect(typeof fiftyP.value).toBe('bigint');
    expect(fiftyP.value).toBe(50n);
    expect(typeof fiftyP.valueAsNumber).toBe('number');
    expect(fiftyP.valueAsNumber).toBe(50);

    const ninetyNineP = Money.fromBigInt(99n, 'GBP');
    expect(typeof ninetyNineP.value).toBe('bigint');
    expect(ninetyNineP.value).toBe(99n);
    expect(typeof ninetyNineP.valueAsNumber).toBe('number');
    expect(ninetyNineP.valueAsNumber).toBe(99);
  });

  it('formats number correctly', () => {
    const zero = Money.fromBigInt(0n, 'GBP');
    expect(zero.valueAsFormattedString).toBe('£0.00');

    const fiftyP = Money.fromBigInt(50n, 'GBP');
    expect(fiftyP.valueAsFormattedString).toBe('£0.50');

    const ninetyNineP = Money.fromBigInt(99n, 'GBP');
    expect(ninetyNineP.valueAsFormattedString).toBe('£0.99');

    const aQuid = Money.fromBigInt(1_00n, 'GBP');
    expect(aQuid.valueAsFormattedString).toBe('£1.00');

    const threeQuid = Money.fromBigInt(3_00n, 'GBP');
    expect(threeQuid.valueAsFormattedString).toBe('£3.00');

    const tenner = Money.fromBigInt(10_00n, 'GBP');
    expect(tenner.valueAsFormattedString).toBe('£10.00');

    const grand = Money.fromBigInt(1000_00n, 'GBP');
    expect(grand.valueAsFormattedString).toBe('£1000.00');
  });

  it('adds correctly', () => {
    const fiftyP = Money.fromBigInt(50n, 'GBP');
    const ninetyNineP = Money.fromBigInt(99n, 'GBP');
    expect(fiftyP.add(ninetyNineP).valueAsFormattedString).toBe('£1.49');
    expect(fiftyP.valueAsFormattedString).toBe('£0.50'); // check immutability

    const grand = Money.fromBigInt(1000_00n, 'GBP');
    expect(fiftyP.add(grand).valueAsFormattedString).toBe('£1000.50');
  });
});
