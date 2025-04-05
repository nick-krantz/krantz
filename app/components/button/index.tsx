import React, { useMemo } from "react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
	variant?: "primary" | "secondary";
};

export const buttonClasses = (variant?: Props["variant"]): string => {
	const colors =
		variant === "secondary"
			? `hover:bg-gray-400 hover:bg-gray-800/[.2] focus:bg-gray-800[.02]
          dark:text-gray-200  dark:hover:bg-white/[.2] dark:focus:bg-white/[.2]`
			: `border rounded-md
          border-gray-800/50 hover:border-gray-800 hover:bg-gray-800/[.2] focus:bg-gray-800[.02]
          dark:border-white/50 dark:hover:border-white dark:hover:bg-white/[.2] dark:focus:bg-white/[.2]`;
	return `inline-flex align-center justify-center rounded-md font-semibold p-2 ${colors}`;
};

export const Button: React.FC<Props> = ({
	children,
	variant,
	className,
	type,
	...props
}) => {
	const classes = useMemo(() => buttonClasses(variant), [variant]);

	return (
		<button type={type} className={`${classes} ${className || ""}`} {...props}>
			{children}
		</button>
	);
};
