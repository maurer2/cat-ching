// eslint unicorn/numeric-separators-style: ["warning", {"minimumDigits": 0, "number": {"groupLength": 2}}]
import Money from './Money';

describe('Money', () => {
  beforeEach(() => {});

  it('formats number correctly', () => {
    const zero = Money.fromBigInt(0n, 'GBP');
    expect(zero.valueAsFormattedString).toBe('£0.00');

    const fiftyP = Money.fromBigInt(50n, 'GBP');
    expect(fiftyP.valueAsFormattedString).toBe('£0.50');

    const ninetyNineP = Money.fromBigInt(99n, 'GBP');
    expect(ninetyNineP.valueAsFormattedString).toBe('£0.99');

    const aQuid = Money.fromBigInt(100n, 'GBP');
    expect(aQuid.valueAsFormattedString).toBe('£1.00');

    const threeQuid = Money.fromBigInt(300n, 'GBP');
    expect(threeQuid.valueAsFormattedString).toBe('£3.00');

    const aTenner = Money.fromBigInt(1000n, 'GBP');
    expect(aTenner.valueAsFormattedString).toBe('£10.00');

    const aGrand = Money.fromBigInt(100_000n, 'GBP');
    expect(aGrand.valueAsFormattedString).toBe('£1000.00');
  });

  it('adds values correctly', () => {
    const fiftyP = Money.fromBigInt(50n, 'GBP');
    const ninetyNineP = Money.fromBigInt(99n, 'GBP');
    expect(fiftyP.add(ninetyNineP).valueAsFormattedString).toBe('£1.49');
    expect(fiftyP.valueAsFormattedString).toBe('£0.50'); // check immutability

    const grand = Money.fromBigInt(100_000n, 'GBP');
    expect(fiftyP.add(grand).valueAsFormattedString).toBe('£1000.50');
  });

  // it('compares values correctly', () => {
  //   const zero = Money.fromBigInt(0n, 'GBP');
  //   const fiftyP = Money.fromBigInt(50n, 'GBP');
  //   const ninetyNineP = Money.fromBigInt(99n, 'GBP');
  //   const aTenner = Money.fromBigInt(10_00n, 'GBP');

  //   expect(zero.isEqualTo(0)).toBe(true);
  //   expect(fiftyP.isEqualTo(50)).toBe(true);
  //   expect(ninetyNineP.isEqualTo(99)).toBe(true);
  //   expect(aTenner.isEqualTo(1000)).toBe(true);
  //   expect(aTenner.isEqualTo(10_00)).toBe(true);
  // });
});
