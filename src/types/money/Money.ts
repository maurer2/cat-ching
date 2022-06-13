/* eslint-disable @typescript-eslint/lines-between-class-members */
const currencies = {
  GBP: '£',
  USD: '$',
} as const;

type CurrencyName = keyof typeof currencies;

export default class Money {
  private readonly value: bigint = 0n;
  private readonly name: CurrencyName = 'GBP';

  public constructor(valueInFraction: number | bigint, name: CurrencyName) {
    this.value = BigInt(valueInFraction);
    this.name = name;
  }

  public add(valueToAdd: Money): Money {
    const { name, value } = this;
    const newValue = value + BigInt(valueToAdd.value);

    return new Money(newValue, name);
  }

  public get valueFormattedAsIntegralAndFraction(): string {
    // https://stackoverflow.com/a/70086020
    const integral = Number(this.value / 100n);
    const fraction = Number(this.value % 100n);

    return `${integral}.${`${fraction}`.padEnd(2, '0')}`;
  }
}
