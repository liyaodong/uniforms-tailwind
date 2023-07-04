import React, { Ref } from "react";
import { HTMLFieldProps, connectField, filterDOMProps } from "uniforms";

export type LongTextFieldProps = HTMLFieldProps<
  string,
  HTMLDivElement,
  { inputRef?: Ref<HTMLTextAreaElement>; description?: string }
>;

function LongText({
  disabled,
  id,
  inputRef,
  label,
  name,
  onChange,
  placeholder,
  readOnly,
  value,
  description,
  ...props
}: LongTextFieldProps) {
  return (
    <div {...filterDOMProps(props)}>
      {label && <label htmlFor={id}>{label}</label>}

      {!!description && (
        <p className="mt-1 text-sm leading-6 text-gray-600">{description}</p>
      )}
      <textarea
        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        disabled={disabled}
        id={id}
        name={name}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        readOnly={readOnly}
        ref={inputRef}
        value={value ?? ""}
      />
    </div>
  );
}

export default connectField<LongTextFieldProps>(LongText, { kind: "leaf" });
