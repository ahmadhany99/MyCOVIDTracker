import axios from 'axios';
import logging from '../source/config/logging';

const NAMESPACE = 'account/test';

beforeAll( () => {
    
})

test('testing jest', () => {
    const myString = 'HelloWorld';
    expect(myString).toEqual('HelloWorld');
})

test('testing login', () => {
    const res = axios.get('localhost:1337/api/account/login',
            {params: {'username': "doremi", 'password': "123"},
        }).catch((err) => {
            logging.error(NAMESPACE, 'Login Test Error: ', err)
        });
    expect(res).toEqual(true);
})