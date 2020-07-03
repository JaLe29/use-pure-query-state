interface IOptions {
    isValueObj?: boolean;
    parseFn?: (value: any) => any;
}
declare const usePureQueryCustomState: <T>(keyName: string, defaultValue: any, options?: IOptions) => any[];
export default usePureQueryCustomState;
