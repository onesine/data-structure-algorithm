import { motion } from "framer-motion";
import { useCallback, useMemo, useState } from "react";

import AppLayout from "@/components/app-layout.tsx";
import { Button } from "@/components/ui/button.tsx";
import VerticalBar from "@/components/vertical-bar.tsx";

interface ArrayNumberType {
    id: string;
    value: number;
}

interface StepType {
    swap: boolean;
    swapIndex: number[];
    maxStep: boolean;
}

const INITIAL_NUMBERS = [
    { id: "1", value: 7 },
    { id: "2", value: 61 },
    { id: "3", value: 8 },
    { id: "4", value: 10 },
    { id: "5", value: 2 },
    { id: "6", value: 23 },
    { id: "7", value: 51 },
    { id: "8", value: 4 },
    { id: "9", value: 13 },
    { id: "10", value: 21 },
    { id: "11", value: 100 },
    { id: "12", value: 15 },
    { id: "13", value: 75 },
    { id: "14", value: 25 },
    { id: "15", value: 44 },
    { id: "17", value: 23 },
    { id: "18", value: 3 },
    { id: "19", value: 18 }
];
const MAX_PERCENTAGE = 100;
const INTERVAL_STEP_DURATION = 600;

const BubbleSort = () => {
    const [arrayStep, setArrayStep] = useState<"initial" | "sorting" | "sort">(
        "initial"
    );
    const [array, setArray] = useState<ArrayNumberType[]>(INITIAL_NUMBERS);
    const [currentAnimate, setCurrentAnimate] = useState<number[]>([]);
    const [sortIndex, setSortIndex] = useState<number[]>([]);

    const maxValue = useMemo(() => {
        return Math.max(...array.map((item) => item.value));
    }, [array]);

    const HeightInPercent = useCallback(
        (value: number) => {
            return (value / maxValue) * MAX_PERCENTAGE;
        },
        [maxValue]
    );

    const handleSort = useCallback(() => {
        const newArray = [...array.map((item) => ({ ...item }))];
        const steps: StepType[] = [];

        for (let i = 0; i < newArray.length - 1; i++) {
            let swap = false;
            for (let y = 0; y < newArray.length - i - 1; y++) {
                const temp = newArray[y].value;
                const step = [y, y + 1];
                const maxStep = y === newArray.length - i - 2;

                if (temp > newArray[y + 1].value) {
                    newArray[y].value = newArray[y + 1].value;
                    newArray[y + 1].value = temp;
                    steps.push({
                        swap: true,
                        swapIndex: step,
                        maxStep: maxStep
                    });
                    swap = true;
                } else {
                    steps.push({
                        swap: false,
                        swapIndex: step,
                        maxStep: maxStep
                    });
                }
            }

            if (!swap) break;
        }

        setArrayStep("sorting");
        steps.forEach((step, index) => {
            setTimeout(() => {
                const {
                    swap,
                    swapIndex: [a, b],
                    maxStep
                } = step;

                setCurrentAnimate([a, b]);
                setArray((prevArray) => {
                    const newItems = [...prevArray];
                    if (swap) {
                        [newItems[a], newItems[b]] = [newItems[b], newItems[a]];
                    }

                    return newItems;
                });

                if (index === steps.length - 1) {
                    setArrayStep("sort");
                    setCurrentAnimate([]);
                }

                if (maxStep) {
                    setSortIndex((prevState) => {
                        const lastsIndex: number[] = [];

                        if (index === steps.length - 1 && b > 0) {
                            for (let i = b - 1; i >= 0; i--) {
                                lastsIndex.push(i);
                            }
                        }

                        return [...prevState, b, ...lastsIndex];
                    });
                }
            }, index * INTERVAL_STEP_DURATION);
        });
    }, [array]);

    return (
        <AppLayout>
            <div className="border rounded-md p-5">
                <h3 className="text-gray-600 text-xl font-medium mb-8 text-center">
                    Bubble Sort
                </h3>

                <Button
                    className="mb-3"
                    onClick={
                        ["initial", "sorting"].includes(arrayStep)
                            ? handleSort
                            : () => {
                                  setArray(INITIAL_NUMBERS);
                                  setArrayStep("initial");
                                  setSortIndex([]);
                              }
                    }
                    disabled={arrayStep === "sorting"}
                >
                    {["initial", "sorting"].includes(arrayStep)
                        ? "Sort"
                        : "Reset"}
                </Button>

                <div className="flex items-end space-x-1 w-2/4 mx-auto">
                    {array.map((item, itemIndex) => (
                        <VerticalBar label={item.value} key={item.id}>
                            <motion.div
                                className="bg-slate-300 border border-slate-400 w-6"
                                style={{
                                    height: `${HeightInPercent(item.value)}%`
                                }}
                                layout
                                animate={{
                                    backgroundColor: sortIndex.includes(
                                        itemIndex
                                    )
                                        ? "#84cc16"
                                        : currentAnimate.includes(itemIndex)
                                          ? "#fbbf24"
                                          : "#cbd5e1",
                                    borderColor: sortIndex.includes(itemIndex)
                                        ? "#84cc16"
                                        : currentAnimate.includes(itemIndex)
                                          ? "#fbbf24"
                                          : "#94a3b8"
                                }}
                                transition={{
                                    layout: {
                                        type: "spring",
                                        stiffness: 300,
                                        damping: 30,
                                        duration: 0.5
                                    }
                                }}
                            />
                        </VerticalBar>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
};

export default BubbleSort;
