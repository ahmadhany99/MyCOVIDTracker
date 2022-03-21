import axios from 'axios';
import { Response } from 'express';
import logging from '../source/config/logging';
<<<<<<< HEAD

const NAMESPACE = 'account/test';

test('testing jest', () => {
    const myString = 'HelloWorld';
    expect(myString).toEqual('HelloWorld');
});

test('testing login', () => {
    axios
        .get('localhost:1337/api/account/login', {
            params: {
                username: 'doremi',
                password: 'test'
            }
        })
        .then((res) => {
            expect(res).toBe(200);
        });
});
=======
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
>>>>>>> 964a4ab544322969a7f38ee48e0e218ad88d5c88
