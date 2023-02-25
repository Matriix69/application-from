import { Checkbox } from "@mui/material";
import { styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import {
    attributes,
    data,
    personalInformation,
    profile,
    requiredProfile,
    requiredProfileFields,
    requiredProfileInfo,
    requiredProfileToggles,
    requiredToggles,
} from "../../libs/types";

const AntSwitch = styled(Switch)(({ theme }) => ({
    width: 28,
    height: 16,
    padding: 0,
    display: "flex",
    "&:active": {
        "& .MuiSwitch-thumb": {
            width: 15,
        },
        "& .MuiSwitch-switchBase.Mui-checked": {
            transform: "translateX(9px)",
        },
    },
    "& .MuiSwitch-switchBase": {
        padding: 2,
        "&.Mui-checked": {
            transform: "translateX(12px)",
            color: "#fff",
            "& + .MuiSwitch-track": {
                opacity: 1,
                backgroundColor: theme.palette.mode === "dark" ? "#177ddc" : "#087B2F",
                border: "none",
            },
            "& .MuiSwitch-thumb": {
                border: "none",
            },
        },
    },
    "& .MuiSwitch-thumb": {
        boxShadow: "none",
        background: "#F4F4F4",
        border: "1px solid #CCCCCC",
        width: 12,
        height: 12,
        borderRadius: 6,
        transition: theme.transitions.create(["width"], {
            duration: 200,
        }),
    },
    "& .MuiSwitch-track": {
        borderRadius: 16 / 2,
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "rgba(255,255,255,.35)" : "transparent",
        border: "1px solid #CCCCCC",
        boxSizing: "border-box",
    },
}));

interface props {
    item: requiredProfileFields;
    attributes: attributes | undefined;
    fields: data | null;
    setFields: (value: data | null) => void;
    reqType: string;
    profile?: boolean;
}

const RequiredFields = ({ item, attributes, fields, setFields, reqType, profile }: props) => {
    const getInputValue = (path: string, key: string) => {
        switch (reqType) {
            case "personalInformation":
                return attributes?.personalInformation?.[path as keyof requiredProfileInfo][key as keyof requiredToggles];
            case "profile":
                return attributes?.profile?.[path as keyof requiredProfile][key as keyof requiredProfileToggles];
        }
    };

    const handleOnchange = (event: React.ChangeEvent<HTMLInputElement>, path: string, key: string) => {
        if (!fields) return;
        switch (reqType) {
            case "personalInformation":
                return setFields({
                    ...fields,
                    attributes: {
                        ...fields.attributes,
                        personalInformation: {
                            ...fields.attributes.personalInformation,
                            [path]: {
                                ...fields.attributes.personalInformation?.[path as keyof personalInformation],
                                [key]: event.target.checked,
                            },
                        },
                    },
                });
            case "profile":
                return setFields({
                    ...fields,
                    attributes: {
                        ...fields.attributes,
                        profile: {
                            ...fields.attributes.profile,
                            [path]: {
                                ...fields.attributes.profile?.[path as keyof profile],
                                [key]: event.target.checked,
                            },
                        },
                    },
                });
        }
    };

    return (
        <div className="grid grid-cols-2 py-4 border-b border-b-[#C4C4C4] ">
            <div className="font-semibold text-base ">{item.title}</div>
            {item.allowToggle && (
                <div className="flex flex-wrap justify-between grid-cols-2 gap-4">
                    <div className="flex items-center">
                        <Checkbox
                            checked={getInputValue(item.path, profile ? "mandatory" : "internalUse") || false}
                            onChange={(event) => {
                                handleOnchange(event, item.path, profile ? "mandatory" : "internalUse");
                            }}
                            sx={{
                                color: "#D4D9E4",
                                "&.Mui-checked": {
                                    color: "#087B2F",
                                },
                            }}
                        />
                        <span className=" text-sm">{profile ? "Mandatory" : "Internal"}</span>
                    </div>
                    <div className="flex items-center gap-2 ml-[9px]">
                        <AntSwitch
                            checked={getInputValue(item.path, "show") || false}
                            onChange={(event) => {
                                handleOnchange(event, item.path, "show");
                            }}
                        />
                        <span className=" text-sm">{getInputValue(item.path, "show") ? "Show" : "Hide"}</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RequiredFields;
