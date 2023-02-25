import React from "react";

const Spinner = () => {
    return (
        <div className="flex items-center justify-center bottom-0 top-[64px] min-[780px]:top-[100px] fixed inset-0 bg-white z-50 spinner">
            <div className="lds-ring mt-[-72px]">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
};

export default Spinner;
