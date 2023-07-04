import React, { Children, cloneElement, isValidElement } from "react";
import { HTMLFieldProps, connectField, filterDOMProps } from "uniforms";

import ListAddField from "./ListAddField";
import ListItemField from "./ListItemField";

export type ListFieldProps = HTMLFieldProps<
  unknown[],
  HTMLUListElement,
  { itemProps?: object; description?: string }
>;

function List({
  children = <ListItemField name="$" />,
  itemProps,
  label,
  value,
  description,
  ...props
}: ListFieldProps) {
  return (
    <ul {...filterDOMProps(props)}>
      {label && (
        <label>
          {label}
          {!!description && (
            <span className="mt-1 text-sm leading-6 text-gray-600">
              {description}
            </span>
          )}
          <ListAddField name="$" />
        </label>
      )}

      {value?.map((item, itemIndex) =>
        Children.map(children, (child, childIndex) =>
          isValidElement(child)
            ? cloneElement(child, {
                key: `${itemIndex}-${childIndex}`,
                // name: child.props.name?.replace("$", "" + itemIndex) as string,
                ...itemProps,
              })
            : child
        )
      )}
    </ul>
  );
}

export default connectField<ListFieldProps>(List);
