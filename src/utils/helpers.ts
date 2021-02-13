type ObjectKey = string | number;

export const mapObject = <T, U>(
  object: Record<ObjectKey, T>,
  callback: (value: T, key: ObjectKey) => U
): U[] => {
  return Object.keys(object).map((key) => callback(object[key], key));
};
