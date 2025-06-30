import { atom } from "jotai";
import { getLanguage, getDeviceType } from "../../shared/utils/environment";

export const currentDeviceAtom = atom(getDeviceType());
export const currentLanguageAtom = atom(getLanguage());
