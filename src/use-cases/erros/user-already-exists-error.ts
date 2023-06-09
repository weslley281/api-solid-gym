export class UsersAlreadyExistisError extends Error {
  constructor() {
    super('O usuário já existe');
  }
}
