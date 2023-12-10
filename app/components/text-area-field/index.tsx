import { useEffect, useRef, useState } from "react";

type Props = {
	hiddenLabel?: boolean;
	className?: string;
	labelProps: React.LabelHTMLAttributes<HTMLLabelElement>;
	textAreaProps: React.TextareaHTMLAttributes<HTMLTextAreaElement>;
	children: React.ReactNode;
};

export const TextAreaField: React.FC<Props> = ({
	children,
	hiddenLabel,
	className,
	labelProps,
	textAreaProps,
}) => {
	const textArea = useRef<HTMLTextAreaElement | null>(null);
	const [height, setHeight] = useState(90);

	useEffect(() => {
		if (textArea.current && textArea.current.scrollHeight > 90) {
			setHeight(textArea.current.scrollHeight + 2);
		}
	}, []);

	return (
		<div className={`flex flex-col items-start w-inherit ${className || ""}`}>
			<label
				{...labelProps}
				className={`mb-2 font-semibold ${
					hiddenLabel ? "overflow-hidden max-h-0 absolute mb-0" : ""
				} ${labelProps.className ?? ""}`}
			>
				{children}
			</label>
			<textarea
				ref={textArea}
				{...textAreaProps}
				style={{ height: `${height}px` }}
				onInput={(e) => {
					const { scrollHeight } = e.currentTarget;
					if (scrollHeight > 90 && scrollHeight !== height) {
						setHeight(scrollHeight + 2);
					}
				}}
				className="w-full rounded-md bg-inherit border-1 border-gray-800 dark:border-gray-200"
			/>
		</div>
	);
};
