export interface SaveDataFormat {
   [currentTime: string]: {
                        firstName: string;
                        lastName ?: string;
                        isDOB: boolean;
                        dob ?: string;
                        isAge: boolean;
                        age ?: number;
                        email: string;
                        password: string;
                        countryCode: string;
                        phoneNo: number;
                        registeringFor: string;
                        symptoms: string[];
                    }
}