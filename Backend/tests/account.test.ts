import { fail } from 'assert';
import logging from '../source/config/logging';
import { accountModel } from '../source/models/account';
import * as accountService from '../source/services/account';

const NAMESPACE = 'account/test';

const test_user: accountModel = {email:"test@gmail.com", password:"123", firstname:"Remi", lastname:"Do"}
const test_user2: accountModel = {email:"newuser@gmail.com", password:"123", firstname:"Hello", lastname:"World"}

test('register:success', async () => {
    await accountService.deleteAccount(test_user2).catch((err) => {
    })
    await accountService.createAccount(test_user2).catch((err) => {
        fail(err.message);
    })
})

test('register:existing account', async () => {
    // test account exists -> expect error
    await accountService.createAccount(test_user).catch((err) => {
        expect(err.message).toBe("account exist");
    })
})

test('login:success', async () => {
    var result = await accountService.loginAccount(test_user);
    expect(result).toBe(true);
})

test('login:wrong password', async () => {
    const wronguser: accountModel = {
        email: "test@gmail.com",
        password: "456"
    }
    var result = await accountService.loginAccount(wronguser);
    expect(result).toBe(false);
})

test('login:wrong user',async () => {
    const wronguser: accountModel = {
        email: "wronguser",
        password: "123"
    }
    await accountService.loginAccount(wronguser).catch((err) => {
        expect(err.message).toBe("account does not exist");
    })
})
