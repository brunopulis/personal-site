import {describe, it, expect} from 'vitest';

import {clampGenerator} from '../../../src/_config/utils/clamp-generator.js';

describe('clampGenerator', () => {
  it('generate clamp value for different min/max', () => {
    const tokens = [{name: 'size-1', min: 16, max: 32}];
    const result = clampGenerator(tokens);
    expect(result[0].name).toBe('size-1');
    expect(result[0].value).toContain('clamp(');
  });

  it('return fixed rem value when min equals max', () => {
    const tokens = [{name: 'fixed', min: 16, max: 16}];
    const result = clampGenerator(tokens);
    expect(result[0].value).toBe('1rem');
  });

  it('handle multiple tokens', () => {
    const tokens = [
      {name: 'small', min: 12, max: 16},
      {name: 'large', min: 24, max: 48}
    ];
    const result = clampGenerator(tokens);
    expect(result).toHaveLength(2);
  });
});
