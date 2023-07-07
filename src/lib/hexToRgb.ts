export default function hexToRgb(hex: string) {
  // '#' 문자 제거
  hex = hex.replace('#', '');

  // 두 자리씩 분리하여 10진수로 변환
  var r = parseInt(hex.substring(0, 2), 16);
  var g = parseInt(hex.substring(2, 4), 16);
  var b = parseInt(hex.substring(4, 6), 16);

  // RGB 함수로 변환하여 반환
  return r + ', ' + g + ', ' + b;
}
