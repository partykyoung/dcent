import { useEffect } from "react";
import { useSetAtom } from "jotai";
import { currentDeviceAtom } from "../stores/environment";
import { getDeviceType } from "../../shared/utils/environment";

function useDevice() {
  const setCurrentDevice = useSetAtom(currentDeviceAtom);

  useEffect(() => {
    const mobileQuery = window.matchMedia("(max-width: 768px)");

    mobileQuery.addEventListener("change", getDeviceType);

    return () => {
      mobileQuery.removeEventListener("change", getDeviceType);
    };
  }, [setCurrentDevice]);
}

export { useDevice };
