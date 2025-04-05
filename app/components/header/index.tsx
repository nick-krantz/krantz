import { Link, useMatches } from "@remix-run/react";
import { useMemo } from "react";
import { FiArrowLeft, FiUser } from "react-icons/fi";
import { Icon } from "../icon";

export type PageDetails = {
  header?: string;
  backLink?: string;
};

export const Header = () => {
  const matches = useMatches();

  const [title, pathname, backLink] = useMemo(() => {
    const reverseMatches = [...matches].reverse();

    const header = reverseMatches.find((m) => m?.data?.pageDetails?.header)
      ?.data.pageDetails.header;
    const backLink = reverseMatches.find((m) => m?.data?.pageDetails?.backLink)
      ?.data.pageDetails.backLink;
    const pathname = matches[matches.length - 1].pathname;
    return [header ?? "", pathname, backLink];
  }, [matches]);

  return (
    <div className="flex py-5">
      <div className="flex flex-1 items-center">
        {pathname !== "/" && (
          <Link to={backLink ?? "/"} aria-label="go back">
            <Icon Icon={FiArrowLeft} />
          </Link>
        )}
      </div>
      <div className="flex-[4_2_0%] w-full capitalize">
        {title && <h1 className="text-center mb-0">{title}</h1>}
      </div>
      <div className=" flex-1 w-full">
      </div>
    </div>
  );
};
