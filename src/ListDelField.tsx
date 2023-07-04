import React from "react";
import {
  HTMLFieldProps,
  connectField,
  filterDOMProps,
  joinName,
  useField,
} from "uniforms";

export type ListDelFieldProps = HTMLFieldProps<unknown, HTMLSpanElement>;

function ListDel({ disabled, name, readOnly, ...props }: ListDelFieldProps) {
  const nameParts = joinName(null, name);
  const nameIndex = +nameParts[nameParts.length - 1];
  const parentName = joinName(nameParts.slice(0, -1));
  const parent = useField<{ minCount?: number }, unknown[]>(
    parentName,
    {},
    { absoluteName: true }
  )[0];

  disabled ||= readOnly || parent.minCount! >= parent.value!.length;
  function onAction(
    event:
      | React.KeyboardEvent<HTMLSpanElement>
      | React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) {
    if (!disabled && (!("key" in event) || event.key === "Enter")) {
      const value = parent.value!.slice();
      value.splice(nameIndex, 1);
      parent.onChange(value);
    }
  }

  return (
    <span
      className="block w-full text-center rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-2xl sm:leading-6"
      {...filterDOMProps(props)}
      onClick={onAction}
      onKeyDown={onAction}
      role="button"
      tabIndex={0}
    >
      -
    </span>
  );
}

export default connectField<ListDelFieldProps>(ListDel, {
  initialValue: false,
  kind: "leaf",
});
