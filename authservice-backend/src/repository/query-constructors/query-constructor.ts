
export abstract class QueryConstructor {
    abstract getQuery(): string;
    abstract getParameters(): Array<any>;
    abstract setQuery(body: string): void;
    abstract setParameters(parameters: Array<any>): void;
}