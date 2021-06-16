export const splitInThree = <T>(arr: T[]): [T?, T[], T?] => {
  const length = arr.length;
  if (!length) return [undefined, [], undefined];
  else if (arr.length === 1) return [arr[0], [], undefined];
  else if (arr.length === 2) return [arr[0], [], arr[1]];
  else return [arr[0], arr.slice(0, length - 1), arr[length - 1]];
};
