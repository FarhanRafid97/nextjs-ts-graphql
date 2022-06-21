import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Select,
} from '@chakra-ui/react';
import { error } from 'console';
import { useField } from 'formik';
import React, { InputHTMLAttributes } from 'react';

interface SelectInputProps {}
type SelectInputField = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label: string;
  optionVal: string[];
};

const SelectInput: React.FC<SelectInputField> = ({
  name,
  label,
  optionVal,
}) => {
  const [field, { error }] = useField({ name });

  return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <Select {...field} id={field.name} placeholder={label}>
        {optionVal.map((val, index) => (
          <option key={index} value={val}>
            {val}
          </option>
        ))}
      </Select>
      {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );
};

export default SelectInput;
