'use strict';

class Pin {
  constructor(physical, name) {
    this.physical = physical;
    this.name = name;
    this.output = this._computeGpioOutput(name);
  }

  _computeGpioOutput(name) {
    const regex = new RegExp('P(A|C|D|G)(\\d+)');
    if (!regex.test(name)) {
      throw new Error(`Invalid PIN name: ${name}`);
    }
    const matchArray = name.match(regex);
    const multiplier = 32;
    const letter = matchArray[1];
    const number = parseInt(matchArray[2]);
    const result = {'A':0, 'C':2, 'D':3, 'G': 6}[letter] * multiplier + number;
    return result;
  }
}

class Pins {
  constructor() {
    this.pins = new Set([
      new Pin(3, 'PA12'),
      new Pin(5, 'PA11'),
      new Pin(7, 'PA6'),
      new Pin(8, 'PA13'),
      new Pin(10, 'PA14'),
      new Pin(11, 'PA1'),
      new Pin(12, 'PD14'),
      new Pin(13, 'PA0'),
      new Pin(15, 'PA3'),
      new Pin(16, 'PC4'),
      new Pin(18, 'PC7'),
      new Pin(19, 'PC0'),
      new Pin(21, 'PC1'),
      new Pin(22, 'PA2'),
      new Pin(23, 'PC2'),
      new Pin(24, 'PC3'),
      new Pin(26, 'PA21'),
      new Pin(27, 'PA19'),
      new Pin(28, 'PA18'),
      new Pin(29, 'PA7'),
      new Pin(31, 'PA8'),
      new Pin(32, 'PG8'),
      new Pin(33, 'PA9'),
      new Pin(35, 'PA10'),
      new Pin(36, 'PG9'),
      new Pin(37, 'PA20'),
      new Pin(38, 'PG6'),
      new Pin(40, 'PG7')
    ]);

    // Register getter by name
    for (const value of this.pins) {
      Object.defineProperty(this, value.name, {
        get: function () { 
          return value.output;
        }
      });
    }
  }

  outputFor(pin) {
    for (const value of this.pins) {
      if (value.name === pin || value.physical === pin) {
        return value.output;
      }
    }
    throw new Error(`Invalid PIN: ${pin}`);
  }

  getPins() {
    return this.pins;
  }
}
const pins = new Pins();

module.exports = pins;
