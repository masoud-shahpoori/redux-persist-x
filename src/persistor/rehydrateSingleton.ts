export class RehydrateSingleton {
  static instance: RehydrateSingleton;
  public isRehydrateSingleton: boolean = false;
  private constructor() {}

  public static getInstance(): RehydrateSingleton {
    if (!RehydrateSingleton.instance) {
      RehydrateSingleton.instance = new RehydrateSingleton();
    }
    return RehydrateSingleton.instance;
  }

  public rehydrate(value: boolean) {
    this.isRehydrateSingleton = value;
  }
}
