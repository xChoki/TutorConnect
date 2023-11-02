import { useState, useEffect } from "react";

export function useValidationRegisterForm(initialValue, validationFn) {
  const [value, setValue] = useState(initialValue);
  const [focused, setFocused] = useState(false);
  const [border, setBorder] = useState("bg-gray-50 border-gray-100");
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (focused && !validationFn(value)) {
      setBorder("bg-red-100 border-red-400 border-4");
      setHasError(true);
    } else {
      setBorder("bg-gray-50 border-gray-100");
      setHasError(false);
    }
  }, [value, focused, validationFn]);

  return {
    value,
    setValue,
    focused,
    setFocused,
    border,
    hasError,
  };
}
