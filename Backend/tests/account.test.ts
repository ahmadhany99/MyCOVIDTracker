import { fail } from 'assert';
import logging from '../source/config/logging';
import { accountModel } from '../source/models/account';
import * as accountService from '../source/services/account';

const NAMESPACE = 'account/test';

const tester: accountModel = {email:'test@gmail.com', password: '123', username:'test'};
const tester2: accountModel = {email:"hello@world.com", password:"wehaveliftoff!"}

beforeAll( () => {
    accountService.deleteAccount(tester2);
})

afterAll( () => {
    setTimeout('',5000);
    accountService.deleteAccount(tester2);
    logging.info(NAMESPACE, "ALL ACCOUNT TESTS ARE FINISHED");
})
test('login:success', async () => {
    var result = await accountService.loginAccount(tester);
    expect(result).toBe(true);
})

test('login:wrong password',async () => {
    const wronguser: accountModel = {
        email: "test@gmail.com",
        password: "456"
    }
    var result = await accountService.loginAccount(wronguser).catch();
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

test('register:account exists', async ()=> {
    await accountService.createAccount(tester).catch((err) => {
        expect(err.message).toBe("email in use");
    })
})

test('register:create', async () => {
    await accountService.createAccount(tester2).catch((err) => {
        fail(err.message);
    })
})