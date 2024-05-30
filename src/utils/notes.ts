const bgColors = ["#d9e8fc", "#ffd8f4", "#fde99d", "#b0e9ca", "#ffe9dd"];
const textColor = "#1f2937";

export const generateColors = () => {
  const idx = Math.floor(Math.random() * bgColors.length);
  return { backgroundColor: bgColors[idx], textColor: textColor };
};
