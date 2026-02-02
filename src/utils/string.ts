export const isString = (value: unknown) => typeof value === 'string';

export const stringIsTrueValue = (value: string | undefined | null) => {
  if (value === undefined || value === null || !isString(value)) {
    return false;
  }

  return ['true', 'yes', '1', ''].includes(value.toLowerCase());
};

export const truncate = (longText: string, maxLength: number = 50) => {
  const subtractLength = 3;
  const longTextLength = longText.length;

  if (
    maxLength <= subtractLength ||
    longTextLength <= subtractLength ||
    longTextLength < maxLength
  ) {
    return longText;
  }

  return `${longText.substring(0, maxLength - subtractLength)}...`;
};

export const stringOrDefaultValue = <T = string | undefined>(
  str: T,
  defaultValue: T = undefined
): T => (!!str ? str : defaultValue);

export const stringToBase64 = (value: string) => {
  if (typeof window !== 'undefined') {
    return window.btoa(value);
  }

  if (Buffer) {
    const bufferObj = Buffer.from(value, 'utf8');
    return bufferObj.toString('base64');
  }

  return '';
};
