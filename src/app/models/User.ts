import AbstractUser from './AbstractUser';

export default class User extends AbstractUser {
  constructor(
    nome: string,
    email: string,
    public id: string,
    public temAmigoSecreto?: boolean,
    public foiSelecionado?: boolean
  ) {
    super(nome, email);
  }
}
