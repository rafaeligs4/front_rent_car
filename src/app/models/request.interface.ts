import { User } from "./user.interface";

export interface RequestHttpInt{
    type: string;
    message: string;
    data?: User|boolean;
    status?: boolean;

}