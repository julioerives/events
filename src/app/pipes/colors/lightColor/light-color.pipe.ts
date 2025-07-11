import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'lightColor'
})
export class LightColorPipe implements PipeTransform {

  transform(rgba: string, factor: number = 0.7): string {
    if (!rgba) return rgba;
    const match = rgba.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
    if (!match) return rgba;

    let [_, r, g, b, a] = match;
    r = Math.floor(Number(r) + (255 - Number(r)) * factor).toString();
    g = Math.floor(Number(g) + (255 - Number(g)) * factor).toString();
    b = Math.floor(Number(b) + (255 - Number(b)) * factor).toString();
    a = a ?? '1';

    return `rgba(${r},${g},${b},${a})`;
  }
}


