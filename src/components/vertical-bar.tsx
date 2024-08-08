import { ReactNode } from "react";

interface Props {
    label: number;
    children?: ReactNode;
}

const VerticalBar = (props: Props) => {
    const { label, children } = props;

    return (
        <div className="flex flex-col items-center">
            <div className="flex items-end h-[405px]">{children}</div>

            <div className="text-xs">{label}</div>
        </div>
    );
};

export default VerticalBar;
