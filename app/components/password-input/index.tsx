import { ErrorMessage } from "../error-message";
import { Field } from "../field";

type Props = {
	password?: string;
	errorMessage?: string;
};

export const PasswordInput: React.FC<Props> = ({ password, errorMessage }) => {
	const hasError = Boolean(errorMessage);
	return (
		<>
			<Field
				labelProps={{ htmlFor: "password-input" }}
				inputProps={{
					type: "password",
					name: "password",
					id: "password-input",
					defaultValue: password,
					"aria-invalid": hasError,
					"aria-describedby": hasError ? "password-error" : undefined,
				}}
			>
				Password
			</Field>
			<ErrorMessage id="password-error">{errorMessage}</ErrorMessage>
		</>
	);
};
