import styled from "@emotion/styled";
import { Button } from "@mui/material";
import Add from "@mui/icons-material/Add";

const WrapButton = styled(Button)({
    color: "black",
    display: "block",
});

const AddQuestionBtn = ({ toggleAddQuestion }: { toggleAddQuestion: (value: boolean) => void }) => {
    return (
        <WrapButton
            className="flex items-center gap-2"
            onClick={() => {
                toggleAddQuestion(true);
            }}
        >
            <Add /> <span className=" text-sm font-semibold">Add a question</span>
        </WrapButton>
    );
};

export default AddQuestionBtn;
