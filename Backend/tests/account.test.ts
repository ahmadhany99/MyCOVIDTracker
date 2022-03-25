import axios from 'axios';
import { Response } from 'express';
import logging from '../source/config/logging';
import { accountModel } from '../source/models/account';
import * as accountService from '../source/services/account';

const NAMESPACE = 'account/test';

const testuser: accountModel = {email:'test@gmail.com', password: '123', username:'test'};

test('login:success', async () => {
    var result = await accountService.loginAccount(testuser);
    expect(result).toBe(true);
})

test('login:wrong password',async () => {
    const wronguser: accountModel = {
        username: "test",
        password: "456"
    }
    var result = await accountService.loginAccount(wronguser);
    expect(result).toBe(false);
})

test('login:wrong user',async () => {
    const wronguser: accountModel = {
        username: "wronguser",
        password: "123"
    }
    var result = await accountService.loginAccount(wronguser);
    expect(result).toBe(false);
})