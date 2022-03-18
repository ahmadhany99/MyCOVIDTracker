import axios from 'axios';
import logging from '../source/config/logging';

const NAMESPACE = 'flagging/test';

// test('testing jest', () =>{
//     const myString = 'HelloWorld';
//     expect(myString).toEqual('HelloWorld');
// })

// Tests to see if patient can be flagged successfully
test('testing patient flagging', () => {
    try {
        axios.get('localhost:1337/api/flag/flagPatient', {
            params: {
                patientID: 8
            }
        });
        // Returns error if test is deemed unsuccessful
    } catch (err) {
        logging.error(NAMESPACE, 'patient flagging test failed', err);
    }
});

// Tests to see if list of flagged patients can be returned successfully
test('testing returning of flagged patients', () => {
    try {
        axios.get('localhost:1337/api/flag/getFlaggedPatients', {
            params: {
                patientID: 8,
                isPrioritized: 1
            }
        });
        // Returns error if test is deemed unsuccessful
    } catch (err) {
        logging.error(NAMESPACE, 'returning of flagged patients test failed', err);
    }
});
