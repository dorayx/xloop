export const nullOrValue = (value: any, defaultValue: any) =>
  value === null ? value : value ?? defaultValue;
