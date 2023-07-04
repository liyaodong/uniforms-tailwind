import React, { Ref } from "react";
import { HTMLFieldProps, connectField, filterDOMProps } from "uniforms";

export type TextFieldProps = HTMLFieldProps<
  string,
  HTMLDivElement,
  { inputRef?: Ref<HTMLInputElement> }
>;

function Text({
  autoComplete,
  disabled,
  id,
  inputRef,
  label,
  name,
  onChange,
  placeholder,
  readOnly,
  type,
  value,
  ...props
}: TextFieldProps) {
  return (
    <div {...filterDOMProps(props)}>
      {label && (
        <label
          className="block text-sm font-medium leading-6 text-gray-900"
          htmlFor={id}
        >
          {label}
        </label>
      )}

      <input
        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        autoComplete={autoComplete}
        disabled={disabled}
        id={id}
        name={name}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        readOnly={readOnly}
        ref={inputRef}
        type={type}
        value={value ?? ""}
      />
    </div>
  );
}

Text.defaultProps = { type: "text" };

export default connectField<TextFieldProps>(Text, { kind: "leaf" });
