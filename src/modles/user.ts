export interface UserInterface {
    first_name: string,
    last_name: string,
    father_name: string,
    vip: boolean,
    allowed: boolean,
    joined_date: Date,
    manager_permissions: number,
    scoring: number,
    status: string,
    statusReason: string,
    street: string,
    num_street: string,
    house: string,
    city: string,
    phon: string,
    phon2: string,
    email: string,
    maritalStatus: string,
    DateOfBirth: Date;
}

export class User implements UserInterface {
    first_name: string = "";
    last_name: string = "";
    father_name: string = "";
    vip: boolean = false;
    allowed: boolean = false;
    joined_date!: Date;
    manager_permissions: number = 0;
    scoring: number = 0;
    status: string = "";
    statusReason: string = "";
    street: string = "";
    num_street: string = "";
    house: string = "";
    city: string = "";
    phon: string = "";
    phon2: string = "";
    email: string = "";
    maritalStatus: string = "";
    DateOfBirth: Date=new Date();

}