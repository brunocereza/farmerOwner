import { cpf, cnpj } from 'cpf-cnpj-validator';

export const verifyCpfCnpj = (document: string) => {
  if (document.length < 9 && document.length !== 14) {
    return false;
  }

  if (document.length === 14) {
    return cnpj.isValid(document);
  }
  return cpf.isValid(document);
};
