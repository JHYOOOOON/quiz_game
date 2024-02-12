import { atom } from "jotai";

import { QuestionList } from "../types";
import { atomWithReset } from "jotai/utils";

export const stepAtom = atomWithReset(0);

export const incorrectListAtom = atom<QuestionList>([]);
