
export const isObject = any => typeof any === 'object' && any !== null && !Array.isArray(any);
export const isUUID = str => /([a-z]|[0-9]){8}-([a-z]|[0-9]){4}-([a-z]|[0-9]){4}-([a-z]|[0-9]){4}-([a-z]|[0-9]){12}/.test(str);
export const sortFunc = (a, b) => {
    if (a === b) return 0;
    return a > b ? 1 : -1;
}
export const assert = (expected, actual) => {
  if (expected === actual) return true;
  throw new Error(`assertion is failed expected:${expected} bad actual is ${actual}`);
}