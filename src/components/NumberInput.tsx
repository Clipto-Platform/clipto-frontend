import { useButton } from '@react-aria/button';
import { useNumberField } from '@react-aria/numberfield';
import { NumberFieldStateProps, useNumberFieldState } from '@react-stately/numberfield';
import { useRef } from 'react';

function NumberField(props: NumberFieldStateProps) {
  const state = useNumberFieldState({ ...props });
  const inputRef = useRef<HTMLInputElement | null>(null);
  const incrRef = useRef<HTMLButtonElement | null>(null);
  const decRef = useRef<HTMLButtonElement | null>(null);
  const { labelProps, groupProps, inputProps, incrementButtonProps, decrementButtonProps } = useNumberField(
    props,
    state,
    inputRef,
  );

  const { buttonProps: incrementProps } = useButton(incrementButtonProps, incrRef);
  const { buttonProps: decrementProps } = useButton(decrementButtonProps, decRef);

  return (
    <div>
      <label {...labelProps}>{props.label}</label>
      <div {...groupProps}>
        <button {...decrementProps} ref={incrRef}>
          -
        </button>
        <input {...inputProps} ref={inputRef} />
        <button {...incrementProps} ref={decRef}>
          +
        </button>
      </div>
    </div>
  );
}

// <NumberField
//   label="Price"
//   defaultValue={6}
//   formatOptions={{
//     style: 'currency',
//     currency: 'USD',
//   }}
// />;

export { NumberField };
