import {describe, it, expect} from 'vitest';
import {tokensToTailwind} from '../../src/_config/utils/tokens-to-tailwind.js';

describe('tokensToTailwind', () => {
  it('convert tokens array to tailwind config object', () => {
    const tokens = [
      {name: 'Size 1', value: '1rem'},
      {name: 'Size 2', value: '2rem'},
    ];
    const result = tokensToTailwind(tokens);
    expect(result).toEqual({'size-1': '1rem', 'size-2': '2rem'});
  });

  it('handle single token', () => {
    const tokens = [{name: 'Base Size', value: '16px'}];
    const result = tokensToTailwind(tokens);
    expect(result).toEqual({'base-size': '16px'});
  });

  it('handle empty array', () => {
    expect(tokensToTailwind([])).toEqual({});
  });
});
