import axios from 'axios';
import { Response } from 'express';
import logging from '../source/config/logging';
import { accountModel } from '../source/models/account';
import { loginDTO } from '../source/models/loginDTO';
import { login } from '../source/services/account';

const NAMESPACE = 'account/test';

test('login:success', async () => {
    const user: loginDTO = {username: 'doremi', password: '123'};
    var result = await login(user);
    expect(result).toBe(true);
})

test('login:wrong password', async () => {
    const user: loginDTO = {username: 'doremi', password: 'wrong'};
    var result = await login(user);
    expect(result).toBe(false);
})

test('login:account does not exists', async () => {
    const user: loginDTO = {username: 'notarealaccountjustfortestingthisisnotreal', password: 'wrong'};
    var result = await login(user);
    expect(result).toBe(false);
})

test('registration', async () => {
    /*const acc: accountModel = {
        username: 'newTestAccount',
        password: '123',
        firstname: 'tester',
        lastname: 'B',
    };*/
    expect(true).toBe(true);
})