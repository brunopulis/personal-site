import {describe, it, expect} from 'vitest';
import {splitlines} from '../../src/_config/filters/splitlines.js';

describe('splitlines', () => {
  it('split text into lines based on max character length', () => {
    const result = splitlines('hello world foo bar', 8);
    expect(result).toEqual(['hello', 'world', 'foo bar']);
  });

  it('return single line when input is shorter than max', () => {
    const result = splitlines('hello', 10);
    expect(result).toEqual(['hello']);
  });

  it('handle empty string', () => {
    const result = splitlines('', 10);
    expect(result).toEqual(['']);
  });

  it('split every word when max is very small', () => {
    const result = splitlines('a b c d', 1);
    expect(result).toEqual(['a', 'b', 'c', 'd']);
  });
});
