import { accountModel } from '../models/account';
import { loginDTO } from '../models/loginDTO';

export function loginDTOToAccountModel(accDTO: loginDTO) {
    const accModel: accountModel = {
        accountId: NaN,
        username: accDTO.username,
        password: accDTO.password,
        firstname: '',
        lastname: '',
        cellPhone: '',
        email: '',
        typeId: NaN,
        languageId: NaN
    };
    return accModel;
}
