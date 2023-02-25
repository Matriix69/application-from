// import Edit from "@mui/icons-material/EditOutlined";
import { Button } from "@mui/material";
import { Fragment, useState } from "react";
import Edit2 from "../../assets/imgs/edit.png";
import { customQuestions, data } from "../../libs/types";
import AddQuestion from "./AddQuestion";

interface props {
    item: customQuestions;
    // attributes: attributes | undefined;
    fields: data | null;
    setFields: (value: data | null) => void;
    index: number;
    reqType: string;
}

const CustomQuestions = ({ item, fields, setFields, index, reqType }: props) => {
    const [edit, setEdit] = useState(false);
    return (
        <Fragment>
            <div className="py-7 border-b border-b-[#C4C4C4] last-of-type:border-none">
                <div className=" text-sm text-neutral-500 font-medium mb-1">{item.type}</div>
                <div className="flex items-start gap-2">
                    <div className="font-semibold text-base">{item.question}</div>
                    <Button
                        className="pt-1 px-2 pb-2"
                        onClick={() => {
                            setEdit(true);
                        }}
                    >
                        <img src={Edit2} alt="edit" />
                    </Button>
                </div>
            </div>
            {edit && (
                <AddQuestion
                    index={index}
                    editFields={item}
                    fields={fields}
                    setFields={setFields}
                    closeAddQuestion={setEdit}
                    reqType={reqType}
                />
            )}
        </Fragment>
    );
};

export default CustomQuestions;
