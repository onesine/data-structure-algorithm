import { motion } from "framer-motion";
import { useCallback, useMemo, useState } from "react";

import AppLayout from "@/components/app-layout.tsx";
import { Button } from "@/components/ui/button.tsx";
import VerticalBar from "@/components/vertical-bar.tsx";
import { cn } from "@/lib/utils.ts";

interface ArrayNumberType {
    id: string;
    value: number;
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

const BubbleSort = () => {
    const [sorting, setSorting] = useState(false);
    const [array, setArray] = useState<ArrayNumberType[]>(INITIAL_NUMBERS);
    const [currentAnimate, setCurrentAnimate] = useState<number[]>([]);

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
        const steps: number[][] = [];

        for (let i = 0; i < newArray.length - 1; i++) {
            let swap = false;
            for (let y = 0; y < newArray.length - i - 1; y++) {
                const temp = newArray[y].value;
                if (temp > newArray[y + 1].value) {
                    newArray[y].value = newArray[y + 1].value;
                    newArray[y + 1].value = temp;
                    steps.push([y, y + 1]);
                    swap = true;
                }
            }

            if (!swap) break;
        }

        setSorting(true);
        steps.forEach((step, index) => {
            setTimeout(() => {
                const [a, b] = step;
                setCurrentAnimate([a, b]);
                setArray((prevArray) => {
                    const newItems = [...prevArray];
                    [newItems[a], newItems[b]] = [newItems[b], newItems[a]];

                    return newItems;
                });

                if (index === steps.length - 1) {
                    setSorting(false);
                    setCurrentAnimate([]);
                }
            }, index * 1000);
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
                    onClick={handleSort}
                    disabled={sorting}
                >
                    Sort
                </Button>

                <div className="flex items-end space-x-1 w-2/4 mx-auto">
                    {array.map((item, itemIndex) => (
                        <VerticalBar label={item.value} key={item.id}>
                            <motion.div
                                className={cn({
                                    "bg-slate-300 border border-slate-400 w-6":
                                        true
                                })}
                                style={{
                                    height: `${HeightInPercent(item.value)}%`
                                }}
                                layout
                                animate={{
                                    backgroundColor: currentAnimate.includes(
                                        itemIndex
                                    )
                                        ? "#fbbf24"
                                        : "#cbd5e1",
                                    borderColor: currentAnimate.includes(
                                        itemIndex
                                    )
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
