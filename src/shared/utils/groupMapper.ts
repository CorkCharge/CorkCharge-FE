export const mapColorToIcon = (color: string): string => {
  // 예: "COLOR_01" -> "SaveMarker1"
  // 예: "COLOR_12" -> "SaveMarker12"
  if (!color) return 'SaveMarker1';
  const num = color.split('_')[1]; // "01", "12"
  return `SaveMarker${parseInt(num, 10)}`;
};

export const mapIconToColor = (iconName: string): string => {
  // 예: "SaveMarker1" -> "COLOR_01"
  const num = iconName.replace('SaveMarker', '');
  const formattedNum = parseInt(num, 10) < 10 ? `0${num}` : num;
  return `COLOR_${formattedNum}`;
};
