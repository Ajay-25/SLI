export type ProfileInfo = {
    dnnUserID: number;
    email: string;
    fullName: string;
    imagePath: string;
    lastlogin: string;
    regionName: string | null;
    regionStateAsList: string | null;
    roles: Array<{RoleId: number, RoleName: string}>;
    sevadarID: number;
    termsAgreed: boolean; 
    address1: string;
    address2: string;
    city: string;
    state: string;
    country: string;
}

export type SevadarHistory = {
    Schedule: {
        Module: {
            name: string;
        }
        venue: string;
        trainingDate: string;
    }
    id: number;
    status: string;
    reflectionStatus: string;
}