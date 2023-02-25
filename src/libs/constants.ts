import { requiredProfileFields } from "./types";

export const URL = "http://127.0.0.1:4010/api/667.8272528181487/programs/itaque/application-form";

interface Routes {
    title: string;
    path: string;
}

export const routes: Routes[] = [
    {
        title: "xxxx",
        path: "/",
    },
    {
        title: "Application form",
        path: "/application-form",
    },
    {
        title: "xxxxx",
        path: "/xx",
    },
];

export const requiredPersonalValues: requiredProfileFields[] = [
    {
        title: "First Name",
        path: "firstName",
        allowToggle: false,
    },
    {
        title: "Last Name",
        path: "lastName",
        allowToggle: false,
    },
    {
        title: "Email",
        path: "emailId",
        allowToggle: false,
    },
    {
        title: "Phone",
        path: "phoneNumber",
        allowToggle: true,
        helpText: "(without dial code)",
    },
    {
        title: "Nationality",
        path: "nationality",
        allowToggle: true,
    },
    {
        title: "Current Residence",
        path: "currentResidence",
        allowToggle: true,
    },
    {
        title: "ID Number",
        path: "idNumber",
        allowToggle: true,
    },
    {
        title: "Date Of Birth",
        path: "dateOfBirth",
        allowToggle: true,
    },
    {
        title: "Gender",
        path: "gender",
        allowToggle: true,
    },
];

export const requiredProfileValues: requiredProfileFields[] = [
    {
        title: "Education",
        path: "education",
        allowToggle: true,
    },
    {
        title: "Experience",
        path: "experience",
        allowToggle: true,
    },
    {
        title: "Resume",
        path: "resume",
        allowToggle: true,
    },
];

interface questionTypes {
    title: string;
    value: string;
}

export const questionTypes: questionTypes[] = [
    {
        title: "Paragraph",
        value: "Paragraph",
    },
    {
        title: "Short answer",
        value: "ShortAnswer",
    },
    {
        title: "Yes/No",
        value: "YesNo",
    },
    {
        title: "Dropdown",
        value: "Dropdown",
    },
    {
        title: "Multiple choice",
        value: "MultipleChoice",
    },
    {
        title: "Date",
        value: "Date",
    },
    {
        title: "Number",
        value: "Number",
    },
    {
        title: "File upload Video question",
        value: "FileUpload",
    },
];

export const LIVE_ERROR = "Something went wrong, please make sure you're testing this on your local and update the url";
