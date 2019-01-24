import stringFormatter from './StringFormatter';
export const CASES = {
  Camel: 0,
  Snake: 1,
  Pascal: 2,
};

export const converterMap = {
  [CASES.Camel]: stringFormatter.toCamelCase,
  [CASES.Snake]: stringFormatter.toSnakeCase,
  [CASES.Pascal]: stringFormatter.toPascalCase,
};
