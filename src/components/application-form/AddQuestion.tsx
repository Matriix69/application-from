import { Fragment, useState } from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormControl from "@mui/material/FormControl";
import { Checkbox, MenuItem, Select } from "@mui/material";
import { questionTypes } from "../../libs/constants";
import { customQuestions, data } from "../../libs/types";
import List from "@mui/icons-material/ListOutlined";
import Add from "@mui/icons-material/Add";
import { generateUUID } from "../../libs/utiles";
import { ReactComponent as Delete } from "../../assets/icons/delete.svg";
import styled from "@emotion/styled";
import { Button as Btn } from "@mui/material";

const Button = styled(Btn)({
    color: "#A80000",
});

interface props {
    fields: data | null;
    setFields: (value: data | null) => void;
    closeAddQuestion: (value: boolean) => void;
    reqType: string;
    index?: number;
    editFields?: customQuestions;
}

const initialValues = {
    id: generateUUID(),
    type: "",
    question: "",
    choices: [""],
    maxChoice: 0,
    disqualify: false,
    other: false,
};

const AddQuestion = ({ fields, setFields, reqType, closeAddQuestion, editFields, index }: props) => {
    const [values, setValues] = useState<customQuestions>(editFields ? editFields : initialValues);

    const { type, choices, other, question, maxChoice, disqualify } = values;

    const handleChange = (key: string, value: string | number | string[] | boolean) => {
        setValues({ ...values, [key]: value });
    };

    const addChoice = () => {
        setValues({ ...values, choices: [...choices, ""] });
    };

    const removeChoice = (index: number) => {
        const newChoices = [...choices];
        newChoices.splice(index, 1);
        setValues({ ...values, choices: [...newChoices] });
    };

    const handleChoiceChange = (value: string, index: number) => {
        const newChoices = [...choices];
        newChoices[index] = value;
        setValues({ ...values, choices: [...newChoices] });
    };

    const save = () => {
        if (!fields) return;
        switch (reqType) {
            case "personalInformation":
                if (editFields && typeof index !== "undefined" && !isNaN(index)) {
                    const newValue = fields;
                    newValue.attributes.personalInformation.personalQuestions[index] = values;
                    setFields({ ...newValue });
                    closeAddQuestion(false);
                    return;
                }
                setFields({
                    ...fields,
                    attributes: {
                        ...fields.attributes,
                        personalInformation: {
                            ...fields.attributes.personalInformation,
                            personalQuestions: [...fields.attributes.personalInformation?.personalQuestions, values],
                        },
                    },
                });
                closeAddQuestion(false);
                return;
            case "profile":
                if (editFields && typeof index !== "undefined" && !isNaN(index)) {
                    const newValue = fields;
                    newValue.attributes.profile.profileQuestions[index] = values;
                    setFields({ ...newValue });
                    closeAddQuestion(false);
                    return;
                }
                setFields({
                    ...fields,
                    attributes: {
                        ...fields.attributes,
                        profile: {
                            ...fields.attributes.profile,
                            profileQuestions: [...fields.attributes.profile?.profileQuestions, values],
                        },
                    },
                });
                closeAddQuestion(false);
                return;
            case "customisedQuestions":
                if (editFields && typeof index !== "undefined" && !isNaN(index)) {
                    const newValue = fields;
                    newValue.attributes.customisedQuestions[index] = values;
                    setFields({ ...newValue });
                    closeAddQuestion(false);
                    return;
                }
                setFields({
                    ...fields,
                    attributes: {
                        ...fields.attributes,
                        customisedQuestions: [...fields.attributes.customisedQuestions, values],
                    },
                });
                closeAddQuestion(false);
                return;
        }
    };

    const deleteQuestion = () => {
        if (!fields) return;
        switch (reqType) {
            case "personalInformation":
                if (editFields && typeof index !== "undefined" && !isNaN(index)) {
                    const newValue = fields;
                    newValue.attributes.personalInformation.personalQuestions.splice(index, 1);
                    setFields({ ...newValue });
                    closeAddQuestion(false);
                }
                return;
            case "profile":
                if (editFields && typeof index !== "undefined" && !isNaN(index)) {
                    const newValue = fields;
                    newValue.attributes.profile.profileQuestions.splice(index, 1);
                    setFields({ ...newValue });
                    closeAddQuestion(false);
                }
                return;
            case "customisedQuestions":
                if (editFields && typeof index !== "undefined" && !isNaN(index)) {
                    const newValue = fields;
                    newValue.attributes.customisedQuestions.splice(index, 1);
                    setFields({ ...newValue });
                    closeAddQuestion(false);
                }
                return;
        }
    };

    return (
        <div className="mb-8 mt-8 grid gap-6">
            <FormControl fullWidth>
                <label className=" text-base font-semibold mb-2">Type</label>
                <Select
                    value={values.type}
                    onChange={(e) => {
                        handleChange("type", e.target.value);
                    }}
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                >
                    {questionTypes.map((item) => (
                        <MenuItem key={item.value} value={item.value}>
                            {item.title}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <FormControl fullWidth>
                <label className=" text-base font-semibold mb-2">Question</label>
                <OutlinedInput
                    aria-describedby="outlined-weight-helper-text"
                    inputProps={{
                        "aria-label": "weight",
                    }}
                    onChange={(e) => {
                        handleChange("question", e.target.value);
                    }}
                    value={question}
                />
            </FormControl>

            {["Dropdown", "MultipleChoice"].includes(type) && (
                <Fragment>
                    <div>
                        <label className=" mb-3 ml-7 text-base font-semibold ">Choice</label>
                        <div className="grid gap-4">
                            {choices.map((item, index) => (
                                <div
                                    className={`grid gap-2 items-center ${
                                        choices.length - 1 === index ? "grid-cols-[20px_1fr_20px]" : "grid-cols-[20px_1fr] "
                                    }`}
                                    key={index}
                                >
                                    <button onClick={() => removeChoice(index)}>
                                        <List />
                                    </button>
                                    <OutlinedInput
                                        value={item}
                                        aria-describedby="outlined-weight-helper-text"
                                        inputProps={{
                                            "aria-label": "weight",
                                        }}
                                        onChange={(e) => handleChoiceChange(e.target.value, index)}
                                    />
                                    {choices.length - 1 === index && (
                                        <button onClick={() => addChoice()}>
                                            <Add />
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center">
                        <Checkbox
                            checked={other}
                            onChange={(event) => {
                                handleChange("other", event.target.checked);
                            }}
                            sx={{
                                color: "#D4D9E4",
                                "&.Mui-checked": {
                                    color: "#087B2F",
                                },
                            }}
                        />
                        <span className=" text-sm">Enable “Other” option </span>
                    </div>
                </Fragment>
            )}

            {["MultipleChoice"].includes(type) && (
                <FormControl fullWidth>
                    <label className=" text-base font-semibold mb-2">Max choice allowed</label>
                    <OutlinedInput
                        aria-describedby="outlined-weight-helper-text"
                        inputProps={{
                            "aria-label": "weight",
                            shrink: true,
                        }}
                        onChange={(e) => {
                            handleChange("maxChoice", parseInt(e.target.value));
                        }}
                        type="number"
                        value={maxChoice}
                    />
                </FormControl>
            )}

            {["YesNo"].includes(type) && (
                <div className="flex items-center">
                    <Checkbox
                        checked={disqualify}
                        onChange={(event) => {
                            handleChange("disqualify", event.target.checked);
                        }}
                        sx={{
                            color: "#D4D9E4",
                            "&.Mui-checked": {
                                color: "#087B2F",
                            },
                        }}
                    />
                    <span className=" text-sm">Disqualify candidate if the answer is no </span>
                </div>
            )}

            <div className="flex justify-between items-center">
                <Button className=" text-sm font-semibold flex items-center gap-2" onClick={() => deleteQuestion()}>
                    <Delete />
                    <span className="text-[#A80000] font-semibold text-sm">Delete question</span>
                </Button>
                <button
                    onClick={save}
                    className=" text-sm font-semibold bg-[#087B2F] rounded-md  px-3 h-[35px] flex items-center justify-center text-neutral-50"
                >
                    <span>Save</span>
                </button>
            </div>
        </div>
    );
};

export default AddQuestion;
