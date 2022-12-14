import type { Extensions } from './ExSlice';
export type Nullable<T> = T & undefined & null;

export type OnlyFuncKeys<T> = {
	[Props in keyof T]: T[Props] extends (...args: never[]) => unknown ? Props : never;
}[keyof T];

export type OnlyFunc<T> = Pick<T, OnlyFuncKeys<T>>;

export type OnlyValue<T> = Omit<T, OnlyFuncKeys<T>>;

export type OnlyState<T> = Omit<OnlyValue<T>, keyof Extensions>;
export type ImplyThis<T> = {
	[K in keyof T]: T[K] extends (...args: infer P) => infer R ? (this: T, ...args: P) => R : T[K];
};
