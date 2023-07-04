import cloneDeep from "lodash/cloneDeep";
import React from "react";
import {
  HTMLFieldProps,
  connectField,
  filterDOMProps,
  joinName,
  useField,
} from "uniforms";

export type ListAddFieldProps = HTMLFieldProps<unknown, HTMLSpanElement>;

function ListAdd({
  disabled,
  name,
  readOnly,
  value,
  ...props
}: ListAddFieldProps) {
  const nameParts = joinName(null, name);
  const parentName = joinName(nameParts.slice(0, -1));
  const parent = useField<{ maxCount?: number }, unknown[]>(
    parentName,
    {},
    { absoluteName: true }
  )[0];

  const limitNotReached =
    !disabled && !(parent.maxCount! <= parent.value!.length);

  function onAction(event: React.KeyboardEvent | React.MouseEvent) {
    if (
      limitNotReached &&
      !readOnly &&
      (!("key" in event) || event.key === "Enter")
    ) {
      parent.onChange(parent.value!.concat([cloneDeep(value)]));
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
      +
    </span>
  );
}

export default connectField<ListAddFieldProps>(ListAdd, {
  initialValue: false,
  kind: "leaf",
});
