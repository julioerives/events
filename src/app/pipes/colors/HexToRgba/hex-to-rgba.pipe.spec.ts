import { HexToRgbaPipe } from './hex-to-rgba.pipe';

describe('HexToRgbaPipe', () => {
  it('create an instance', () => {
    const pipe = new HexToRgbaPipe();
    expect(pipe).toBeTruthy();
  });
});
