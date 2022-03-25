import internal from "stream"

export type accountModel = 
{
    accountID?: number,
    email?: string,
    password?: string,

    username?: string,
    firstname?: string,
    lastname?: string,
    userType?: number,
    language?: number,
    cellPhone?: string
}