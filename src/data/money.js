export default class Money {
  constructor(value, currency) {
    this.value = value;
    this.currency = currency;
  }

  get valueInCents() {
    return this.value;
  }

  get valueFormatted() {
    const formattedValue = this.value / 100;
    
    return formattedValue.toFixed(2);
  }
};
