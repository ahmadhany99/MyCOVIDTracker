import axios from 'axios';
import logging from '../../source/config/logging';

const NAMESPACE = 'account/test';

test('testing jest', () =>{
    const myString = 'HelloWorld';
    expect(myString).toEqual('HelloWorld');
})

test('testing login', () =>{
    try{
        axios.get('localhost:1337/api/account/login',
            {params: {
                'username': "doremi",
                'password': "test"
            },
        // Case 1: Check email does not exists (request)
        // Case 2: Email no exist in database (response)
        });
    } catch(err) {
        logging.error(NAMESPACE, 'login test error', err);
    }
})