import React from "react";
import { HTMLFieldProps, connectField, filterDOMProps } from "uniforms";

import AutoField from "./AutoField";

export type NestFieldProps = HTMLFieldProps<
  object,
  HTMLDivElement,
  { itemProps?: object; description?: string }
>;

function Nest({
  children,
  fields,
  itemProps,
  label,
  description,
  ...props
}: NestFieldProps) {
  return (
    <div {...filterDOMProps(props)}>
      {label && <label>{label}</label>}
      {!!description && (
        <p className="mt-1 text-sm leading-6 text-gray-600">{description}</p>
      )}
      {children ||
        fields.map((field) => (
          <AutoField key={field} name={field} {...itemProps} />
        ))}
    </div>
  );
}

export default connectField<NestFieldProps>(Nest);
