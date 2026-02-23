import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type SubmissionResult = {
    __kind__: "error";
    error: string;
} | {
    __kind__: "success";
    success: string;
};
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
export type Time = bigint;
export enum Condition {
    new_ = "new",
    good = "good",
    poor = "poor",
    average = "average",
    excellent = "excellent"
}
export interface backendInterface {
    getAllCustomerContacts(): Promise<Array<[string, string, string, string]>>;
    getAllSubmissions(): Promise<Array<Submission>>;
    getSubmission(id: string): Promise<Submission | null>;
    submitAC(brand: string, model: string, age: bigint, condition: Condition, customerName: string, phone: string, email: string): Promise<SubmissionResult>;
}
