export interface Account{
  id: string;
  typeAccount: 'AHORRO' | 'CORRIENTE' | '';
  balance: number;
}
