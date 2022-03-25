import axios from 'axios';
import { Response } from 'express';
import logging from '../source/config/logging';
import { accountModel } from '../source/models/account';
import { loginDTO } from '../source/models/loginDTO';
import * as accountService from '../source/services/account';

const NAMESPACE = 'account/test';

test('register:success',async () => {
    const testuser: accountModel = {email:'test@gmail.com', password: '123',username:'test', firstname:'Remi', lastname:'Do'};
    var result = await accountService.createAccount(testuser)
})

test('login:success', async () => {
    const user: loginDTO = {username: 'doremi', password: '123'};
    var result = await accountService.login(user);
    expect(result).toBe(true);
})

test('login:wrong password', async () => {
    const user: loginDTO = {username: 'doremi', password: 'wrong'};
    var result = await accountService.login(user);
    expect(result).toBe(false);
})

test('login:account does not exists', async () => {
    const user: loginDTO = {username: 'notarealaccountjustfortestingthisisnotreal', password: 'wrong'};
    var result = await accountService.login(user);
    expect(result).toBe(false);
})
