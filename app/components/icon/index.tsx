import React from "react";
import { IconType } from "react-icons";

export const Icon: React.FC<{ Icon: IconType | React.FC }> = ({ Icon }) => (
	<Icon className="inline-block w-8 h-8" />
);
