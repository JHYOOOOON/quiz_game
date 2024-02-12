import { atom } from "jotai";
import { RESET } from "jotai/utils";

import { stepAtom } from "./atoms";

export const withStepAtom = atom(
	(get) => get(stepAtom),
	(get, set, value: number | typeof RESET) => {
		if (value === RESET) {
			set(stepAtom, 0);
			return;
		}
		set(stepAtom, value);
	}
);
