import { motion } from "framer-motion";
import { useCallback, useState } from "react";

import AppLayout from "@/components/app-layout.tsx";
import VerticalBar from "@/components/vertical-bar.tsx";
import Header from "@/page/sort/components/header.tsx";
import useCommonAspectSort from "@/page/sort/hooks/useCommonAspectSort.ts";
import { ArrayStepType } from "@/types";

interface StepType {
    index: number;
    swapsIndex: number[] | null;
}

const INTERVAL_STEP_DURATION = 500;

const Insertion = () => {
    const {
        arrayStep,
        array,
        sortIndexes,
        heightInPercent,
        handleReset,
        transition
    } = useCommonAspectSort();

    const [currentIndex, setCurrentIndex] = useState<number | null>(null);

    const handleSort = useCallback(() => {
        const newArray = [...array.get().map((item) => ({ ...item }))];
        const steps: StepType[] = [];

        steps.push({
            index: 0,
            swapsIndex: null
        });

        for (let i = 1; i < newArray.length; i++) {
            const currentMin = newArray[i];
            let j = i - 1;

            while (j >= 0 && currentMin.value < newArray[j].value) {
                newArray[j + 1] = newArray[j];
                newArray[j] = currentMin;
                steps.push({
                    index: j + 1,
                    swapsIndex: [j, j + 1]
                });
                j--;
            }
        }

        arrayStep.set(ArrayStepType.Sorting);
        steps.forEach((item, itemIndex) => {
            setTimeout(() => {
                const { index, swapsIndex } = item;

                setCurrentIndex(index);

                if (itemIndex === 0) {
                    sortIndexes.set(() => [0]);
                }

                if (swapsIndex) {
                    const [a, b] = swapsIndex;

                    if (itemIndex !== b)
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
                    setCurrentIndex(null);
                }
            }, itemIndex * INTERVAL_STEP_DURATION);
        });
    }, [array, arrayStep, sortIndexes]);

    return (
        <AppLayout>
            <div className="border rounded-md p-5">
                <Header
                    title="Selection Sort"
                    handleSort={handleSort}
                    handleReset={() => {
                        handleReset();
                        setCurrentIndex(null);
                    }}
                    arrayStep={arrayStep.get()}
                />

                <div className="flex items-end space-x-1 w-2/4 mx-auto">
                    {array.get().map((item, itemIndex) => (
                        <VerticalBar key={item.id} label={item.value}>
                            <motion.div
                                className="bg-slate-300 border border-slate-400 w-6"
                                style={{
                                    height: `${heightInPercent(item.value)}%`
                                }}
                                layout
                                animate={{
                                    backgroundColor:
                                        currentIndex === itemIndex
                                            ? "#fbbf24"
                                            : sortIndexes
                                                    .get()
                                                    .includes(itemIndex)
                                              ? "#15803d"
                                              : "#cbd5e1",
                                    borderColor:
                                        currentIndex === itemIndex
                                            ? "#fbbf24"
                                            : sortIndexes
                                                    .get()
                                                    .includes(itemIndex)
                                              ? "#15803d"
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

export default Insertion;
