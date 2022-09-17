export interface Extensions {
	$name: string;
	$options: Record<string, unknown>;
}

export interface Init<State> {
	$init: State;
}

export type ExSlice<State> = OnlyFunc<State> & Partial<OnlyState<State>> & Partial<Extensions>;
