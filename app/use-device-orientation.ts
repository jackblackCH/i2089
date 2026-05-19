"use client";

import { useCallback, useEffect, useState } from "react";

type DeviceOrientation = {
  alpha: number | null;
  beta: number | null;
  gamma: number | null;
};

type UseDeviceOrientationData = {
  orientation: DeviceOrientation | null;
  error: Error | null;
  requestAccess: () => Promise<boolean>;
  revokeAccess: () => Promise<void>;
};

// iOS Safari adds a static `requestPermission` to DeviceOrientationEvent that
// isn't part of the standard TS lib. Narrow to it via a typed shim.
type RequestPermissionFn = () => Promise<PermissionState>;
type DeviceOrientationEventWithPermission = typeof DeviceOrientationEvent & {
  requestPermission?: RequestPermissionFn;
};

export function useDeviceOrientation(): UseDeviceOrientationData {
  const [error, setError] = useState<Error | null>(null);
  const [orientation, setOrientation] = useState<DeviceOrientation | null>(null);

  const onDeviceOrientation = useCallback(
    (event: DeviceOrientationEvent): void => {
      setOrientation({
        alpha: event.alpha,
        beta: event.beta,
        gamma: event.gamma,
      });
    },
    []
  );

  const revokeAccess = useCallback(async (): Promise<void> => {
    window.removeEventListener("deviceorientation", onDeviceOrientation);
    setOrientation(null);
  }, [onDeviceOrientation]);

  const requestAccess = useCallback(async (): Promise<boolean> => {
    if (typeof window === "undefined" || typeof DeviceOrientationEvent === "undefined") {
      setError(
        new Error("Device orientation event is not supported by your browser")
      );
      return false;
    }

    const Ctor = DeviceOrientationEvent as DeviceOrientationEventWithPermission;
    if (typeof Ctor.requestPermission === "function") {
      let permission: PermissionState;
      try {
        permission = await Ctor.requestPermission();
      } catch (err) {
        setError(err instanceof Error ? err : new Error(String(err)));
        return false;
      }
      if (permission !== "granted") {
        setError(
          new Error("Request to access the device orientation was rejected")
        );
        return false;
      }
    }

    window.addEventListener("deviceorientation", onDeviceOrientation);
    return true;
  }, [onDeviceOrientation]);

  useEffect(() => {
    return () => {
      void revokeAccess();
    };
  }, [revokeAccess]);

  return {
    orientation,
    error,
    requestAccess,
    revokeAccess,
  };
}
