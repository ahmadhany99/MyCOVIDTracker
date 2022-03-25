/**
   * Quarantine model which follows the components of the
   * quarantine table
   */

export type quarantine =
{
    patientID : number,
    inQuarantine: number,
    startTime: string,
    endDate: string,
    daysLeft : number
}