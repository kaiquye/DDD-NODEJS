export abstract class UseCaseAdapter<UserCaseIn, UseCaseOut> {
  abstract execute(data: UserCaseIn): UseCaseOut;
}
