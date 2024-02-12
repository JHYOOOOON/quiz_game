import { atom } from "jotai";

import { QuestionList } from "../types";
import { atomWithReset } from "jotai/utils";

export const stepAtom = atomWithReset(0);

export const incorrectListAtom = atom<QuestionList>([]);

export const startTimeAtom = atom<number>(0);

export const elapsedTimeAtom = atom<number>(0);
