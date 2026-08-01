import {ReactNode} from "react";
import clsx from "clsx";

type PanelProps = {
    children:ReactNode;
    className?:string;
};

export default function Panel({
    children,
    className,
}:PanelProps){
    return (
    <div className={clsx("rounded-3xl",
        "bg-white/70",
        "backdrop-blur-md",
        "border",
        "border-white/60",
        "shadow-xl",
        "shadow-orange-200/30",
        "p-8",
         className
        )}
        >
            {children}
        </div>
        );
}