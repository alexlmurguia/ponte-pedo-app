// contrast-color.util.ts
export function getContrastColor(color: string): 'black' | 'white' {
    const hexColor = color.replace('#', '');
    const r = parseInt(hexColor.substr(0, 2), 16);
    const g = parseInt(hexColor.substr(2, 2), 16);
    const b = parseInt(hexColor.substr(4, 2), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  
    return brightness > 128 ? 'black' : 'white';
  }
  