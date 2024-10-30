export type PersistorState = Record<string, any>;

export interface Persistor {
  dispatch(action: any): any;
  getState(): PersistorState;
}
