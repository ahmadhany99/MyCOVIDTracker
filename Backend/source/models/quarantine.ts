/**
   * Quarantine model which follows the components of the
   * quarantine table
   */

export type quarantine =
{
    patientID : number,
    inQuarantine: boolean,
    startTime: Date,
    endDate: Date,
    daysLeft : number
}