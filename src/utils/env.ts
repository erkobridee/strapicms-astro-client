import { stringIsTrueValue } from '~/utils/string';

//----------------------------------------------------------------------------//

export type EnvironmentVariableName = `$VITE_${string}`;

const getEnvironmentVariable = (name: EnvironmentVariableName) => {
  if (!name.startsWith('$VITE_')) {
    return name;
  }

  return import.meta.env[name.slice(1)] || null;
};

//----------------------------------------------------------------------------//

export const isCIEnv = stringIsTrueValue(
  `${getEnvironmentVariable('$VITE_CI')}`
);
