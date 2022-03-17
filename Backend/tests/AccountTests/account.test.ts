import axios from 'axios';
import { Response } from 'express';
import logging from '../../source/config/logging';

const NAMESPACE = 'account/test';

test('testing jest', () => {
    const myString = 'HelloWorld';
    expect(myString).toEqual('HelloWorld');
})

test('testing login', () =>{
    axios.get('localhost:1337/api/account/login',
        {params: {
            'username': "doremi",
            'password': "test"
        }
    }).then((res) => {
        expect(res).toBe(200);
    });
});