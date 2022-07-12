export function validDate(unvalidatedDate: string): boolean {
    return new Date(unvalidatedDate)?.toString() !== 'Invalid Date' && !isNaN(new Date(unvalidatedDate)?.getTime());
}
