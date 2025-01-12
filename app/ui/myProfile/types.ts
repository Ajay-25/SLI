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
}