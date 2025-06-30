import { atom } from "jotai";
import { getLanguage, getDeviceType } from "../../shared/utils/environment";

export const currentDevice = atom(getDeviceType());
export const currentLanguage = atom(getLanguage());
