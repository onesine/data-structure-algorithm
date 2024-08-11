import { motion } from "framer-motion";
import { useCallback, useState } from "react";

import AppLayout from "@/components/app-layout.tsx";
import VerticalBar from "@/components/vertical-bar.tsx";
import Header from "@/page/sort/components/header.tsx";
import useCommonAspectSort from "@/page/sort/hooks/useCommonAspectSort.ts";
import { ArrayStepType } from "@/types";

interface StepType {
    index: number;
    minIndex: number;
    swapsIndex: number[] | null;
}

const INTERVAL_STEP_DURATION = 400;

const Selection = () => {
    const {
        arrayStep,
        array,
        sortIndexes,
        heightInPercent,
        handleReset,
        transition
    } = useCommonAspectSort();
    const [currentIndex, setCurrentIndex] = useState<number | null>(null);
    const [currentMinIndex, setCurrentMinIndex] = useState<number | null>(null);

    const handleSort = useCallback(() => {
        const newArray = [...array.get().map((item) => ({ ...item }))];
        const steps: StepType[] = [];

        for (let i = 0; i < newArray.length - 1; i++) {
            let minIndex = i;
            steps.push({
                index: i,
                minIndex: minIndex,
                swapsIndex: null
            });

            for (let y = i + 1; y < newArray.length; y++) {
                if (newArray[minIndex].value > newArray[y].value) {
                    minIndex = y;
                }

                let swapsIndex: number[] | null = null;

                if (y === newArray.length - 1) {
                    swapsIndex = [i, minIndex];
                }

                steps.push({
                    index: y,
                    minIndex: minIndex,
                    swapsIndex: swapsIndex
                });
            }

            if (minIndex !== i) {
                const temp = newArray[i];
                newArray[i] = newArray[minIndex];
                newArray[minIndex] = temp;
            }
        }

        arrayStep.set(ArrayStepType.Sorting);
        steps.forEach((item, itemIndex) => {
            setTimeout(() => {
                const { index, minIndex, swapsIndex } = item;

                setCurrentIndex(index);
                if (minIndex !== currentMinIndex) setCurrentMinIndex(minIndex);

                if (swapsIndex) {
                    const [a, b] = swapsIndex;

                    sortIndexes.set((prevState) => [...prevState, a]);

                    array.set((prevArray) => {
                        const newItems = [...prevArray];
                        [newItems[a], newItems[b]] = [newItems[b], newItems[a]];

                        return newItems;
                    });
                }

                if (itemIndex === steps.length - 1) {
                    arrayStep.set(ArrayStepType.Sort);
                    sortIndexes.set((prevState) => [
                        ...prevState,
                        newArray.length - 1
                    ]);
                }
            }, itemIndex * INTERVAL_STEP_DURATION);
        });
    }, [array, arrayStep, currentMinIndex, sortIndexes]);

    return (
        <AppLayout>
            <div className="border rounded-md p-5">
                <Header
                    title="Selection Sort"
                    handleSort={handleSort}
                    handleReset={() => {
                        handleReset();
                        setCurrentMinIndex(null);
                        setCurrentIndex(null);
                    }}
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
                                        ? "#15803d"
                                        : currentMinIndex === itemIndex
                                          ? "#22c55e"
                                          : currentIndex === itemIndex
                                            ? "#fbbf24"
                                            : "#cbd5e1",
                                    borderColor: sortIndexes
                                        .get()
                                        .includes(itemIndex)
                                        ? "#15803d"
                                        : currentMinIndex === itemIndex
                                          ? "#22c55e"
                                          : currentIndex === itemIndex
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

export default Selection;
