import { coinSchema, coinListSchema } from './coins';

describe('coins', () => {
  it('coin', () => {
    const data = {
      name: '1 Pound',
      value: 100,
      image: '1l.png',
      size: {
        width: 23.3,
        height: 23.43,
        unit: 'mm',
      },
    };

    expect(() => {
      coinSchema.parse(data);
    }).not.toThrowError();
  });

  it('coin list', () => {
    const data = [
      {
        name: '1 Pound',
        value: 100,
        image: '1l.png',
        size: {
          width: 23.3,
          height: 23.43,
          unit: 'mm',
        },
      },
      {
        name: '2 Pounds',
        value: 200,
        image: '2l.png',
        size: {
          width: 28.4,
          height: 28.4,
          unit: 'mm',
        },
      },
    ];

    expect(() => {
      coinListSchema.parse(data);
    }).not.toThrowError();
  });

  it('coin list - duplicates', () => {
    const data = [
      {
        name: '1 Pound',
        value: 100,
        image: '1l.png',
        size: {
          width: 23.3,
          height: 23.43,
          unit: 'mm',
        },
      },
      {
        name: '2 Pounds',
        value: 100,
        image: '2l.png',
        size: {
          width: 28.4,
          height: 28.4,
          unit: 'mm',
        },
      },
    ];

    expect(() => {
      coinListSchema.parse(data);
    }).toThrowError();
  });
});
