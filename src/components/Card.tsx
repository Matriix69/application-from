import React, { ReactElement } from "react";

const Card = ({ title, children }: { title: string; children: ReactElement }) => {
    return (
        <div className="shadow-[3px_3px_14px_rgba(190,190,190,0.3)] rounded-[20px] overflow-hidden text-lg sm:text-2xl">
            <div className="p-4 sm:p-7 bg-[#D0F7FA] font-semibold ">{title}</div>
            <div className="p-4 sm:p-7">{children}</div>
        </div>
    );
};

export default Card;
