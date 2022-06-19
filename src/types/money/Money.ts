/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/lines-between-class-members */
export const currencies = {
  GBP: '£',
  USD: '$',
} as const;

export type CurrencyName = keyof typeof currencies;

export default class Money {
  private readonly _value: bigint;
  private readonly _name: CurrencyName;
  private readonly _formatter: Intl.NumberFormat;

  public static fromBigInt(
    valueInFractions: bigint,
    name: CurrencyName,
    formatter?: Intl.NumberFormat,
  ): Money {
    return new this(valueInFractions, name, formatter);
  }

  public static fromNumber(
    valueInFractions: number,
    name: CurrencyName,
    formatter?: Intl.NumberFormat,
  ): Money {
    const valueAsBigInt = BigInt(valueInFractions);

    return new this(valueAsBigInt, name, formatter);
  }

  public static fromRandom(name: CurrencyName, formatter?: Intl.NumberFormat): Money {
    const randomNumber: number = Math.ceil(Math.random() * (1000 - 1)) + 1;
    const valueAsBigInt = BigInt(randomNumber);

    return new this(valueAsBigInt, name, formatter);
  }

  private constructor(valueInFractions: bigint, name: CurrencyName, formatter?: Intl.NumberFormat) {
    this._value = valueInFractions;
    this._name = name;
    this._formatter = formatter
      ?? new Intl.NumberFormat('en-GB', {
        style: 'currency',
        currency: 'GBP',
        useGrouping: false, // disable thousand separator
      });
  }

  public add(valueToAdd: Money): Money {
    const newValue: bigint = this._value + valueToAdd._value;

    return new Money(newValue, this._name, this._formatter);
  }

  public isEqualTo(secondValue: Money): boolean {
    return this._value === secondValue._value;
  }

  public isNegative(): boolean {
    return this._value < 0;
  }

  public get valueAsSeparateParts(): Intl.NumberFormatPart[] {
    // todo Number.MAX_SAFE_INTEGER and Number.MIN_SAFE_INTEGER check
    const valueAsNumber = Number(this._value) / 100;

    return this._formatter.formatToParts(valueAsNumber);
  }

  public get valueAsFormattedString(): string {
    // todo Number.MAX_SAFE_INTEGER and Number.MIN_SAFE_INTEGER check
    const valueAsNumber = Number(this._value) / 100;

    return this._formatter.format(valueAsNumber);
  }

  public get valueFormattedAsIntegerAndFraction(): string {
    // https://stackoverflow.com/a/70086020
    const integer = Number(this._value / 100n);
    const fraction = Number(this._value % 100n);
    // const integral = Number(this.value / 100n);
    // const fraction = Number(this.value % 100n);

    return `${integer}.${`${fraction}`.padEnd(2, '0')}`;
  }
}

export type MoneyType = typeof Money;
