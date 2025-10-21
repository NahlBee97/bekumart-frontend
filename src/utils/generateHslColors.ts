export const generateHslColors = (count: number) => {
  const colors = [];
  const hueStep = 360 / count;

  for (let i = 0; i < count; i++) {
    const hue = i * hueStep;
    // 70% saturation and 50% lightness work well for vibrant chart colors.
    colors.push(`hsl(${hue}, 70%, 50%)`);
  }

  return colors;
};
