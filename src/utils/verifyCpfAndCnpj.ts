import { cpf, cnpj } from 'cpf-cnpj-validator';

export const verifyCpfCnpj = (document: string) => {
  if (document.length < 9 && document.length !== 14) {
    return false;
  }

  /*Remove os caracters especiais - Isso abre margem de erro para formatação incorreta do documento, 
  Ex: CPF -> 0.89.51.0.25.5/85 
  Como ele remove os caracter especiais, irá
  ficar com tamanho 11 igual*/
  const documentFormated = document.replace(/[^\d]+/g, '');

  if (documentFormated.length === 14) {
    return cnpj.isValid(documentFormated);
  }
  return cpf.isValid(documentFormated);
};
