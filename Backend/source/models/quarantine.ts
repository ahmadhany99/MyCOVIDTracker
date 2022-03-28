/**
   * Quarantine model which follows the components of the
   * quarantine table
   */

export type quarantine =
{
    patientID : number,
    inQuarantine: boolean,
    startDate: string,
    endDate: string,
    daysLeft : number
}