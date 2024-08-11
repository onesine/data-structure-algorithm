import { motion } from "framer-motion";
import { useCallback, useState } from "react";

import AppLayout from "@/components/app-layout.tsx";
import VerticalBar from "@/components/vertical-bar.tsx";
import Header from "@/page/sort/components/header.tsx";
import useCommonAspectSort from "@/page/sort/hooks/useCommonAspectSort.ts";
import { ArrayStepType } from "@/types";

interface StepType {
    swap: boolean;
    swapIndex: number[];
    maxStep: boolean;
}

const INTERVAL_STEP_DURATION = 500;

const Bubble = () => {
    const {
        arrayStep,
        array,
        sortIndexes,
        heightInPercent,
        handleReset,
        transition
    } = useCommonAspectSort();
    const [currentAnimate, setCurrentAnimate] = useState<number[]>([]);

    const handleSort = useCallback(() => {
        const newArray = [...array.get().map((item) => ({ ...item }))];
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

        arrayStep.set(ArrayStepType.Sorting);
        steps.forEach((step, index) => {
            setTimeout(() => {
                const {
                    swap,
                    swapIndex: [a, b],
                    maxStep
                } = step;

                setCurrentAnimate([a, b]);
                array.set((prevArray) => {
                    const newItems = [...prevArray];
                    if (swap) {
                        [newItems[a], newItems[b]] = [newItems[b], newItems[a]];
                    }

                    return newItems;
                });

                if (index === steps.length - 1) {
                    arrayStep.set(ArrayStepType.Sort);
                    setCurrentAnimate([]);
                }

                if (maxStep) {
                    sortIndexes.set((prevState) => {
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
    }, [array, arrayStep, sortIndexes]);

    return (
        <AppLayout>
            <div className="border rounded-md p-5">
                <Header
                    title="Bubble Sort"
                    handleSort={handleSort}
                    handleReset={handleReset}
                    arrayStep={arrayStep.get()}
                />

                <div className="flex items-end space-x-1 w-2/4 mx-auto">
                    {array.get().map((item, itemIndex) => (
                        <VerticalBar label={item.value} key={item.id}>
                            <motion.div
                                className="bg-slate-300 border border-slate-400 w-6"
                                style={{
                                    height: `${heightInPercent(item.value)}%`
                                }}
                                layout
                                animate={{
                                    backgroundColor: sortIndexes
                                        .get()
                                        .includes(itemIndex)
                                        ? "#84cc16"
                                        : currentAnimate.includes(itemIndex)
                                          ? "#fbbf24"
                                          : "#cbd5e1",
                                    borderColor: sortIndexes
                                        .get()
                                        .includes(itemIndex)
                                        ? "#84cc16"
                                        : currentAnimate.includes(itemIndex)
                                          ? "#fbbf24"
                                          : "#94a3b8"
                                }}
                                transition={transition}
                            />
                        </VerticalBar>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
};

export default Bubble;
