export type patient=
{
    patientID : number,
    doctorID: number,
    contactID: number,

    weight: number,
    height:number,

    dateOfBirth: number,
    isQuarantined: boolean,
    isPrioritized: boolean,
    covidStatus: boolean
}