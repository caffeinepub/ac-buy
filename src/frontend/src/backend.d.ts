import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Time = bigint;
export interface Submission {
    age: bigint;
    customerName: string;
    model: string;
    email: string;
    timestamp: Time;
    brand: string;
    phone: string;
    condition: Condition;
}
export interface Condition {
    description: string;
}
export interface backendInterface {
    getAllSubmissions(): Promise<Array<Submission>>;
    getSubmission(id: string): Promise<Submission | null>;
    submitAirConditioner(brand: string, model: string, age: bigint, condition: Condition, customerName: string, phone: string, email: string): Promise<boolean>;
}
