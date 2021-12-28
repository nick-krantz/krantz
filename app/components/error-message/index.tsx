type Props = {
  condition: unknown;
  id: string;
};

/**
 * Reuseable error message component.
 * Renders when `condition` is truthy.
 */
export const ErrorMessage: React.FC<Props> = ({ condition, id, children }) => {
  if (Boolean(condition)) {
    return (
      <p id={id} role="alert">
        {children}
      </p>
    );
  }

  return null;
};
