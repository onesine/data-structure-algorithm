import Fibonacci from "@/page/fibonacci.tsx";
import Bubble from "@/page/sort/bubble.tsx";
import Insertion from "@/page/sort/insertion.tsx";
import Selection from "@/page/sort/selection.tsx";

const PAGES = {
    FIBONACCI: {
        asideText: "Fibonacci",
        path: "/",
        page: Fibonacci
    },
    BUBBLE_SORT: {
        asideText: "Bubble Sort",
        path: "/sort/bubble",
        page: Bubble
    },
    SELECTION_SORT: {
        asideText: "Selection Sort",
        path: "/sort/selection",
        page: Selection
    },
    INSERTION_SORT: {
        asideText: "Insertion Sort",
        path: "/sort/insertion",
        page: Insertion
    }
};

export default PAGES;
