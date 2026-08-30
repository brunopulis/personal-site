import {describe, it, expect} from 'vitest';
import {PassThrough} from 'node:stream';
import {createPrompter} from '../../scripts/lib/prompter.js';

describe('createPrompter', () => {
  const makeOutput = () => {
    const out = {writes: []};
    out.write = text => out.writes.push(text);
    return out;
  };

  it('resolve answers in order when lines arrive before ask', async () => {
    const input = new PassThrough();
    const prompter = createPrompter(input, makeOutput());
    input.write('primeira\nsegunda\n');

    expect(await prompter.ask('Q1: ')).toBe('primeira');
    expect(await prompter.ask('Q2: ')).toBe('segunda');
    prompter.close();
  });

  it('resolve a pending ask when a line arrives after', async () => {
    const input = new PassThrough();
    const prompter = createPrompter(input, makeOutput());
    const pending = prompter.ask('Q1: ');

    input.write('resposta\n');
    expect(await pending).toBe('resposta');
    prompter.close();
  });

  it('write questions to the output stream', async () => {
    const input = new PassThrough();
    const output = makeOutput();
    const prompter = createPrompter(input, output);
    input.write('x\n');

    await prompter.ask('Título: ');
    expect(output.writes).toEqual(['Título: ']);
    prompter.close();
  });

  it('resolve with empty string on EOF while a question is pending', async () => {
    const input = new PassThrough();
    const prompter = createPrompter(input, makeOutput());
    const pending = prompter.ask('Q1: ');

    input.end();
    expect(await pending).toBe('');
    prompter.close();
  });

  it('resolve remaining asks with empty string after the stream closes', async () => {
    const input = new PassThrough();
    const prompter = createPrompter(input, makeOutput());
    input.end();

    expect(await prompter.ask('Q1: ')).toBe('');
    expect(await prompter.ask('Q2: ')).toBe('');
    prompter.close();
  });

  it('default to process.stdout as the output stream', async () => {
    const input = new PassThrough();
    const prompter = createPrompter(input);
    input.write('x\n');

    expect(await prompter.ask('Q1: ')).toBe('x');
    prompter.close();
  });
});
