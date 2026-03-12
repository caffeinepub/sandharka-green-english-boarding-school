import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Notice {
    title: string;
    content: string;
    date: string;
}
export interface backendInterface {
    addNotice(title: string, content: string, date: string): Promise<void>;
    getAllNotices(): Promise<Array<Notice>>;
}
