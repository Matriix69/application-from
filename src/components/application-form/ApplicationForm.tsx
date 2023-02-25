import { Fragment, useEffect, useState } from "react";
import Card from "../Card";
import { ApiData, data } from "../../libs/types";
import { LIVE_ERROR, requiredPersonalValues, requiredProfileValues, URL } from "../../libs/constants";
import RequiredFields from "./RequiredFields";
import AddQuestion from "./AddQuestion";
import CustomQuestions from "./CustomQuestions";
import Upload from "../Upload";
import { ReactComponent as Send } from "../../assets/icons/send.svg";
import { Button } from "@mui/material";
import AddQuestionBtn from "../AddQuestionBtn";
import Spinner from "../Spinner";
import toast from "react-hot-toast";
import styled from "@emotion/styled";

const SendButton = styled(Button)({
    backgroundColor: "#21B592",
    color: "white",
    padding: "16px 24px",
    borderRadius: "6px",
    marginLeft: "auto",

    "&:hover": {
        backgroundColor: "#00635b",
        color: "white",
    },
});

const ApplicationForm = () => {
    const [isFetching, setIsFetching] = useState(false);
    const [addMoreQuestionsPersonalInfo, setAddMoreQuestionsPersonalInfo] = useState(false);
    const [addMoreQuestionsProfileInfo, setAddMoreQuestionsProfileInfo] = useState(false);
    const [addMoreQuestionsCustomized, setAddMoreQuestionsCustomized] = useState(false);
    const [fields, setFields] = useState<data | null>(null);

    const getFormFields = async () => {
        try {
            setIsFetching(true);
            const response = await fetch(URL);
            if (!response?.ok) {
                toast.error(LIVE_ERROR);
                return setIsFetching(false);
            }
            const data: ApiData = await response.json();
            setFields(data.data);
            setTimeout(() => setIsFetching(false), 1000);
        } catch (error) {
            toast.error(LIVE_ERROR);
            setIsFetching(false);
        }
    };

    const saveForm = async () => {
        try {
            const response = await fetch(URL, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ data: fields }),
            });
            if (response.ok) toast.success("Submitted!");
            else toast.error("Ops... something wrong, please test on your local");
        } catch (error) {
            toast.error("Ops... can't post data, make sure you're running on local");
        }
    };

    useEffect(() => {
        getFormFields();
    }, []);

    const { attributes } = fields || {};

    return (
        <Fragment>
            {isFetching && <Spinner />}
            <div className="max-w-[580px] grid gap-12 mt-10">
                <Upload fields={fields} setFields={setFields} />

                <Card title="Personal Information">
                    <div>
                        {requiredPersonalValues.map((item) => (
                            <RequiredFields
                                key={item.path}
                                item={item}
                                attributes={attributes}
                                fields={fields}
                                setFields={setFields}
                                reqType="personalInformation"
                            />
                        ))}

                        <div className="py-4">
                            {attributes?.personalInformation?.personalQuestions?.map((item, index) => (
                                <CustomQuestions
                                    key={item.id}
                                    item={item}
                                    fields={fields}
                                    setFields={setFields}
                                    index={index}
                                    reqType="personalInformation"
                                />
                            ))}
                        </div>

                        {addMoreQuestionsPersonalInfo && (
                            <AddQuestion
                                fields={fields}
                                setFields={setFields}
                                reqType="personalInformation"
                                closeAddQuestion={setAddMoreQuestionsPersonalInfo}
                            />
                        )}
                        <AddQuestionBtn toggleAddQuestion={setAddMoreQuestionsPersonalInfo} />
                    </div>
                </Card>

                <Card title="Profile">
                    <div>
                        {requiredProfileValues.map((item) => (
                            <RequiredFields
                                key={item.path}
                                item={item}
                                attributes={attributes}
                                fields={fields}
                                setFields={setFields}
                                reqType="profile"
                                profile
                            />
                        ))}

                        <div className="py-4">
                            {attributes?.profile?.profileQuestions?.map((item, index) => (
                                <CustomQuestions
                                    key={item.id}
                                    item={item}
                                    fields={fields}
                                    setFields={setFields}
                                    index={index}
                                    reqType="profile"
                                />
                            ))}
                        </div>

                        {addMoreQuestionsProfileInfo && (
                            <AddQuestion
                                fields={fields}
                                setFields={setFields}
                                reqType="profile"
                                closeAddQuestion={setAddMoreQuestionsProfileInfo}
                            />
                        )}

                        <AddQuestionBtn toggleAddQuestion={setAddMoreQuestionsProfileInfo} />
                    </div>
                </Card>

                <Card title="Additional questions">
                    <Fragment>
                        <div className="-mt-7">
                            {attributes?.customisedQuestions?.map((item, index) => (
                                <CustomQuestions
                                    key={item.id}
                                    item={item}
                                    fields={fields}
                                    setFields={setFields}
                                    index={index}
                                    reqType="customisedQuestions"
                                />
                            ))}
                        </div>

                        {addMoreQuestionsCustomized && (
                            <AddQuestion
                                fields={fields}
                                setFields={setFields}
                                reqType="customisedQuestions"
                                closeAddQuestion={setAddMoreQuestionsCustomized}
                            />
                        )}
                        <div className="mt-2" />
                        <AddQuestionBtn toggleAddQuestion={setAddMoreQuestionsCustomized} />
                    </Fragment>
                </Card>

                <SendButton
                    className=" w-fit flex items-center gap-4 "
                    onClick={() => {
                        saveForm();
                    }}
                >
                    <span>Save & continue</span>
                    <Send />
                </SendButton>
            </div>
        </Fragment>
    );
};

export default ApplicationForm;
