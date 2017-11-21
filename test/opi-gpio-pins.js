'use strict';

const assert = require('assert');
const pins = require('../opi-gpio-pins.js');

describe('getter', () => {
  it('PA1 should return value 1', () => {
    assert.equal(pins.PA1, 1);
  });

  it('PC1 should return value 65', () => {
    assert.equal(pins.PC1, 65);
  });

  it('PD14 should return value 110', () => {
    assert.equal(pins.PD14, 110);
  });

  it('PG6 should return value 198', () => {
    assert.equal(pins.PG6, 198);
  });

  it('PD1 should return undefined', () => {
    assert.equal(pins.PD1, undefined);
  });
});

describe('outputFor', () => {
  it('outputFor name PA12 should return value 12', () => {
    assert.equal(pins.outputFor('PA12'), 12);
  });

  it('outputFor physical 11 should return value 12', () => {
    assert.equal(pins.outputFor(3), 12);
  });

  it('outputFor name PG9 should return value 201', () => {
    assert.equal(pins.outputFor('PG9'), 201);
  });

  it('outputFor physical 36 should return value 201', () => {
    assert.equal(pins.outputFor(36), 201);
  });

  it('outputFor name PD1 should throw an error', () => {
    assert.throws(() => pins.outputFor('PD1'), (err) => {
      if ((err instanceof Error) && /Invalid PIN: PD1/.test(err)) return true;
    });
  });

   it('outputFor physical 1 should throw an error', () => {
    assert.throws(() => pins.outputFor(1), (err) => {
      if ((err instanceof Error) && /Invalid PIN: 1/.test(err)) return true;
    });
  });
});

describe('getPins', () => {
  it('getPins returns count 28', () => {
    assert.equal(pins.getPins().size, 28);
  });

  it('getPins returns count 28', () => {
    const pin3 = [...pins.getPins().values()][0];
    assert.equal(pin3.physical, 3);
    assert.equal(pin3.name, 'PA12');
    assert.equal(pin3.output, 12);
  });
});