import stringFormat from '../lib/stringFormat';
export const CASES = {
  Camel: 0,
  Snake: 1,
  Pascal: 2,
};

export const converterMap = {
  [CASES.Camel]: stringFormat.toCamelCase,
  [CASES.Snake]: stringFormat.toSnakeCase,
  [CASES.Pascal]: stringFormat.toPascalCase,
};
