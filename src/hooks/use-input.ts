import { useState } from "react";

export const useInput = (
  initialValue: string = ""
): [
  string,
  React.ChangeEventHandler,
  React.Dispatch<React.SetStateAction<string>>
] => {
  const [value, setValue] = useState(initialValue);
  const handleChange = (evt: any) => setValue(evt.target.value);
  return [value, handleChange, setValue];
};
