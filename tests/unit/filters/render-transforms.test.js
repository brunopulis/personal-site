import {describe, it, expect} from 'vitest';
import {renderTransforms} from '../../../src/_config/filters/render-transforms.js';

describe('renderTransforms', () => {
  it('wrap content in CDATA tag', () => {
    expect(renderTransforms('hello')).toBe('<![CDATA[hello]]>');
  });

  it('return empty string for non-string input', () => {
    expect(renderTransforms(null)).toBe('');
  });

  it('return empty string for number input', () => {
    expect(renderTransforms(42)).toBe('');
  });

  it('handle empty string', () => {
    expect(renderTransforms('')).toBe('<![CDATA[]]>');
  });
});
