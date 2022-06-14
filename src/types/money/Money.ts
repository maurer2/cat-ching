/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/lines-between-class-members */
const currencies = {
  GBP: '£',
  USD: '$',
} as const;

type CurrencyName = keyof typeof currencies;

export default class Money {
  private readonly _value: bigint = 0n;
  private readonly _name: CurrencyName = 'GBP';

  public static fromBigInt(valueInFractions: bigint, name: CurrencyName) {
    return new this(valueInFractions, name);
  }

  public static fromNumber(valueInFractions: number, name: CurrencyName) {
    const valueAsBigInt = BigInt(valueInFractions);

    return new this(valueAsBigInt, name);
  }

  private constructor(valueInFractions: bigint, name: CurrencyName) {
    this._value = BigInt(valueInFractions);
    this._name = name;
  }

  public add(valueToAdd: Money): Money {
    const newValue: bigint = this._value + BigInt(valueToAdd.value);

    return new Money(newValue, this._name);
  }

  public get valueFormattedAsIntegralAndFraction(): string {
    // https://stackoverflow.com/a/70086020
    const integral = Number(this.value / 100n);
    const fraction = Number(this.value % 100n);

    return `${integral}.${`${fraction}`.padEnd(2, '0')}`;
  }

  public get value(): bigint {
    return this._value;
  }

  public get valueAsNumber(): number {
    return Number(this._value);
  }
}
