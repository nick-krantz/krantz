import { useState } from "react";
import { FiX } from "react-icons/fi";
import { v4 as uuidv4 } from "uuid";
import { Button } from "~/components/button";
import { Icon } from "~/components/icon";
import { TextAreaField } from "~/components/text-area-field";
import { ScraperRecipeWithIds } from "~/types/utility-types";

interface InstructionListProps {
	initialInstructions?: ScraperRecipeWithIds["instructions"];
}

/**
 * Instruction list
 */
export const InstructionList: React.FC<InstructionListProps> = ({
	initialInstructions,
}) => {
	const [instructions, setInstructions] = useState<
		ScraperRecipeWithIds["instructions"]
	>(initialInstructions ?? []);

	const addInstruction = () => {
		setInstructions([...instructions, { id: uuidv4(), instruction: "" }]);
	};

	const removeInstruction = (id: string) => {
		setInstructions(instructions.filter((i) => i.id !== id));
	};

	return (
		<fieldset className="flex flex-col">
			<legend className="mb-2 text-xl font-semibold">Instructions</legend>
			<ol className="list mb-2 list-[decimal] list-outside ml-6 marker:text-xl">
				{instructions.map(({ id, instruction }, i) => (
					<li className="list-item mb-2" key={`instruction-${id}`}>
						<div className="flex gap-4 items-center ">
							<TextAreaField
								className="flex-1"
								labelProps={{ htmlFor: id, className: "text-lg" }}
								textAreaProps={{
									name: "instructions",
									id: id,
									required: true,
									defaultValue: instruction,
									rows: 3,
								}}
								hiddenLabel
							>
								Instruction {i}
							</TextAreaField>
							<Button
								type="button"
								variant="secondary"
								className="p-1"
								aria-label="Remove instruction"
								onClick={() => removeInstruction(id)}
							>
								<Icon Icon={FiX} />
							</Button>
						</div>
					</li>
				))}
			</ol>
			<Button className="self-end" type="button" onClick={addInstruction}>
				Add Instruction
			</Button>
		</fieldset>
	);
};
