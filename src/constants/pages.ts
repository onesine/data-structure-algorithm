import BubbleSort from "@/page/bubble-sort.tsx";
import Fibonacci from "@/page/fibonacci.tsx";

const PAGES = {
    FIBONACCI: {
        asideText: "Fibonacci",
        path: "/",
        page: Fibonacci
    },
    BUBBLE_SORT: {
        asideText: "Bubble Sort",
        path: "/bubble-sort",
        page: BubbleSort
    }
};

export default PAGES;
