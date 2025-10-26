// eslint-disable-next-line
export function getTotalPages(items: Array<any>, currentPage:number, itemPerPage:number): {totalPages: number, currentItems: Array<any>} {

    const indexOfLastitem = currentPage * itemPerPage;
    const indexOfFirstitem = indexOfLastitem - itemPerPage;
    const currentItems = items.slice(indexOfFirstitem, indexOfLastitem);
    const totalPages = Math.ceil(items.length / itemPerPage);

    return {totalPages, currentItems};
}

export function generateHslColors(count: number) {
  const colors = [];
  const hueStep = 360 / count;

  for (let i = 0; i < count; i++) {
    const hue = i * hueStep;
    // 70% saturation and 50% lightness work well for vibrant chart colors.
    colors.push(`hsl(${hue}, 70%, 50%)`);
  }

  return colors;
};

export function formatNumberCompact(num: number) {
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(num);
};

