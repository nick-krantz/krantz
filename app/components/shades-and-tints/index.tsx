import { adjustColor } from "~/utils/colors";
import { ColorIncrement } from "./color-increment";

type Props = {
	color: string;
};

export const ShadesAndTints: React.FC<Props> = ({ color }) => (
	<div className="text-left mb-8">
		<h2 className="text-2xl">Shades &#38; Tints</h2>

		{[10, 9, 8, 7, 6, 5, 4, 3, 2, 1].map((shadePercentage) => {
			const shade = adjustColor(color, shadePercentage, "tint");
			if (!shade) return null;
			return <ColorIncrement key={shadePercentage} color={shade} />;
		})}

		<ColorIncrement color={color} />

		{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((shadePercentage) => {
			const shade = adjustColor(color, shadePercentage, "shade");
			if (!shade) return null;
			return <ColorIncrement key={shadePercentage} color={shade} />;
		})}
	</div>
);
