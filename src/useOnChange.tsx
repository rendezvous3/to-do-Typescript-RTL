import React from 'react';

type ChangeEvt = React.ChangeEvent<HTMLInputElement>;

export const useOnChange = () => {
  const [value, setValue] = React.useState<string>('');
  const handleChange = (e: ChangeEvt): void => {
    setValue(e.target.value);
  };

  return {
    value,
    setValue,
    handleChange,
  };
};
