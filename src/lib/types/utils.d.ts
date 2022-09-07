export type Nullable<T> = T | undefined | null;

export type AnyVoidFunction = (...args: never[]) => void;

/**
 * Extract function from object.
 */
export type ExtractFunctionFromObject<Props> = {
	[Key in keyof Props]: Props[Key] extends AnyVoidFunction ? Key : Props;
}[keyof Props];

/**
 * Pick only function from object.
 */
export type OnlyFunc<T> = Pick<T, ExtractFunctionFromObject<T>>;

/**
 * Pick only primitive from object.
 */
export type OnlyPrimitive<T> = Omit<T, ExtractFunctionFromObject<T>>;
