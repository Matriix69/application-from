interface IObjectKeys {
    [key: string]: string | number;
}

export interface ApiData {
    data: data;
}

export interface data {
    id: string;
    type: string;
    attributes: attributes;
}

export interface attributes {
    coverImage: string;
    personalInformation: personalInformation;
    profile: profile;
    customisedQuestions: customQuestions[];
}

export interface personalInformation {
    firstName: {
        internalUse: boolean;
        show: boolean;
    };
    lastName: {
        internalUse: boolean;
        show: boolean;
    };
    emailId: {
        internalUse: boolean;
        show: boolean;
    };
    phoneNumber: {
        internalUse: boolean;
        show: boolean;
    };
    nationality: {
        internalUse: boolean;
        show: boolean;
    };
    currentResidence: {
        internalUse: boolean;
        show: boolean;
    };
    idNumber: {
        internalUse: boolean;
        show: boolean;
    };
    dateOfBirth: {
        internalUse: boolean;
        show: boolean;
    };
    gender: {
        internalUse: boolean;
        show: boolean;
    };
    personalQuestions: customQuestions[];
}

export interface profile {
    education: requiredProfileToggles;
    experience: requiredProfileToggles;
    resume: requiredProfileToggles;
    profileQuestions: customQuestions[];
}

export interface customQuestions {
    id: string;
    type: string;
    question: string;
    choices: string[];
    maxChoice: number;
    disqualify: boolean;
    other: boolean;
}

export interface requiredProfileFields {
    title: string;
    path: string;
    allowToggle: boolean;
    helpText?: string;
}

export interface requiredProfileInfo {
    firstName: {
        internalUse: boolean;
        show: boolean;
    };
    lastName: {
        internalUse: boolean;
        show: boolean;
    };
    emailId: {
        internalUse: boolean;
        show: boolean;
    };
    phoneNumber: {
        internalUse: boolean;
        show: boolean;
    };
    nationality: {
        internalUse: boolean;
        show: boolean;
    };
    currentResidence: {
        internalUse: boolean;
        show: boolean;
    };
    idNumber: {
        internalUse: boolean;
        show: boolean;
    };
    dateOfBirth: {
        internalUse: boolean;
        show: boolean;
    };
    gender: {
        internalUse: boolean;
        show: boolean;
    };
}

export interface nonRequiredProfileInfo {
    personalQuestions: customQuestions[];
}

export interface requiredToggles {
    internalUse: boolean;
    show: boolean;
}
export interface requiredProfileToggles {
    mandatory: boolean;
    show: boolean;
}
export interface requiredProfile {
    education: requiredProfileToggles;
    experience: requiredProfileToggles;
    resume: requiredProfileToggles;
}

export interface requiredProfileToggles {
    mandatory: boolean;
    show: boolean;
}
