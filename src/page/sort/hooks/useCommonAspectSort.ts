import { useCallback, useMemo, useState } from "react";

import { INITIAL_NUMBERS, MAX_PERCENTAGE } from "@/constants";
import { ArrayNumberType, ArrayStepType } from "@/types";

const useCommonAspectSort = () => {
    const [arrayStep, setArrayStep] = useState<ArrayStepType>(
        ArrayStepType.Initial
    );
    const [array, setArray] = useState<ArrayNumberType[]>(INITIAL_NUMBERS);
    const [sortIndexes, setSortIndexes] = useState<number[]>([]);

    const handleReset = useCallback(() => {
        setArray(INITIAL_NUMBERS);
        setArrayStep(ArrayStepType.Initial);
        setSortIndexes([]);
    }, []);

    const maxValue = useMemo(() => {
        return Math.max(...array.map((item) => item.value));
    }, [array]);

    const heightInPercent = useCallback(
        (value: number) => {
            return (value / maxValue) * MAX_PERCENTAGE;
        },
        [maxValue]
    );

    return {
        arrayStep: { set: setArrayStep, get: () => arrayStep },
        array: { set: setArray, get: () => array },
        handleReset,
        heightInPercent,
        sortIndexes: { set: setSortIndexes, get: () => sortIndexes },
        transition: {
            layout: {
                type: "spring",
                stiffness: 300,
                damping: 30,
                duration: 0.5
            }
        }
    };
};

export default useCommonAspectSort;
