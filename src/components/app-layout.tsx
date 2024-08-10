import { ReactNode } from "react";

import Aside from "@/components/aside.tsx";
import Nav from "@/components/nav.tsx";

interface Props {
    children: ReactNode;
}

const AppLayout = (props: Props) => {
    const { children } = props;

    return (
        <>
            <Aside />

            <section className="min-h-screen flex flex-col justify-between relative top-0 left-[300px] w-[calc(100%-300px)]">
                <Nav />

                <main className="pt-16 pb-5 px-12">{children}</main>
            </section>
        </>
    );
};

export default AppLayout;
