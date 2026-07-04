import {describe, it, expect} from 'vitest';
import {striptags} from '../../../src/_config/filters/striptags.js';

describe('striptags', () => {
  it('remove HTML tags from string', () => {
    expect(striptags('<p>Hello</p>')).toBe('Hello');
  });

  it('remove multiple HTML tags', () => {
    expect(striptags('<div><p>Text</p></div>')).toBe('Text');
  });

  it('return empty string when given empty string', () => {
    expect(striptags('')).toBe('');
  });

  it('handle string without HTML tags', () => {
    expect(striptags('plain text')).toBe('plain text');
  });

  it('remove self-closing tags', () => {
    expect(striptags('Hello<br/>World')).toBe('HelloWorld');
  });

  it('remove tags with attributes', () => {
    expect(striptags('<a href="link">click here</a>')).toBe('click here');
  });
});
