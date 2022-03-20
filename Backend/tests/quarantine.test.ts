import axios from 'axios';
import logging from '../source/config/logging';

const NAMESPACE = 'quarantine/test';

// test('testing jest', () =>{
//     const myString = 'HelloWorld';
//     expect(myString).toEqual('HelloWorld');
// })

test('testing the input of start time', () => {
    try {
        axios.get('https://tranquil-wildwood-60713.herokuapp.com/api/quarantine/getRemainingDays', {
            params: {
                patientID: 8
            }
        });
    } catch (err) {
        logging.error(NAMESPACE, 'inputting Start time test failed', err);
    }
});
