import { Button } from "@/components/ui/button.tsx";
import { ArrayStepType } from "@/types";

interface Props {
    title: string;
    arrayStep: ArrayStepType;
    handleSort: () => void;
    handleReset: () => void;
}

const Header = (props: Props) => {
    const { title, arrayStep, handleSort, handleReset } = props;

    return (
        <>
            <h3 className="text-gray-600 text-xl font-medium mb-8 text-center">
                {title}
            </h3>

            <Button
                className="mb-3"
                onClick={
                    [ArrayStepType.Initial, ArrayStepType.Sorting].includes(
                        arrayStep
                    )
                        ? handleSort
                        : handleReset
                }
                disabled={arrayStep === ArrayStepType.Sorting}
            >
                {[ArrayStepType.Initial, ArrayStepType.Sorting].includes(
                    arrayStep
                )
                    ? "Sort"
                    : "Reset"}
            </Button>
        </>
    );
};

export default Header;
