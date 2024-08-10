import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useMemo, useRef, useState } from "react";

import AppLayout from "@/components/app-layout.tsx";
import { Button } from "@/components/ui/button.tsx";
import VerticalBar from "@/components/vertical-bar.tsx";
import { MAX_PERCENTAGE } from "@/constants";
import { cn } from "@/lib/utils.ts";

const MAX_LIMIT = 19;
const MIN_LIMIT = 9;
const MIN_LIMIT_FIBONACCI_VALUE = 13;
const INITIAL_FIBONACCI_NUMBERS = [0, 1];
const INITIAL_LIMIT = INITIAL_FIBONACCI_NUMBERS.length;

const Fibonacci = () => {
    const [numbers, setNumbers] = useState<number[]>(INITIAL_FIBONACCI_NUMBERS);
    const [creating, setCreating] = useState<boolean>(false);
    const limit = useRef<number>(INITIAL_LIMIT);

    const fibonacciCal = useCallback((prev1: number, prev2: number) => {
        if (!limit?.current) return;

        if (limit?.current < MAX_LIMIT) {
            const result = prev1 + prev2;

            setNumbers((state) => [...state, result]);
            limit.current++;
            setTimeout(() => {
                fibonacciCal(prev2, result);
            }, 500);
        }

        limit?.current === MAX_LIMIT && setCreating(false);
        return;
    }, []);

    const handleCreateFibonacciList = useCallback(() => {
        setCreating(true);
        fibonacciCal(0, 1);
    }, [fibonacciCal]);

    const handleResetFibonacciList = useCallback(() => {
        setNumbers(INITIAL_FIBONACCI_NUMBERS);
        limit.current = INITIAL_LIMIT;
    }, []);

    const scale = useMemo(() => {
        if (numbers.length <= MIN_LIMIT) return MIN_LIMIT / MAX_LIMIT;

        return 1;
    }, [numbers.length]);

    const maxValue = useMemo(() => {
        if (numbers.length <= MIN_LIMIT) return MIN_LIMIT_FIBONACCI_VALUE;

        return Math.max(...numbers);
    }, [numbers]);

    const HeightInPercent = useCallback(
        (value: number) => {
            return (value / maxValue) * MAX_PERCENTAGE;
        },
        [maxValue]
    );

    return (
        <AppLayout>
            <div className="border rounded-md p-5">
                <h3 className="text-gray-600 text-xl font-medium mb-8 text-center">
                    Fibonacci Numbers
                </h3>

                <Button
                    onClick={
                        limit.current === MAX_LIMIT
                            ? handleResetFibonacciList
                            : handleCreateFibonacciList
                    }
                    className="mb-3"
                    disabled={creating}
                >
                    {limit.current === MAX_LIMIT ? "Reset" : "Create"}
                </Button>

                <div className="flex items-end mx-auto space-x-1 w-2/3 min-h-[415px]">
                    <AnimatePresence>
                        {numbers.map((item, index) => (
                            <VerticalBar label={item} key={index}>
                                <motion.div
                                    initial={{
                                        height: "0rem",
                                        width: "0rem"
                                    }}
                                    animate={{
                                        height: `${HeightInPercent(item) * scale}%`,
                                        width: "1.5rem"
                                    }}
                                    exit={{
                                        height: "0rem",
                                        opacity: "0"
                                    }}
                                    className={cn({
                                        "bg-slate-300 border border-slate-400 w-6":
                                            true
                                    })}
                                    style={{
                                        height: `${HeightInPercent(item) * scale}%`
                                    }}
                                />
                            </VerticalBar>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </AppLayout>
    );
};

export default Fibonacci;
