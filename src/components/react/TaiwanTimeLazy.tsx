import { lazy, Suspense } from "react";

const TaiwanTimeComponent = lazy(() => import("./TaiwanTime"));

export default function TaiwanTimeLazy() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TaiwanTimeComponent />
    </Suspense>
  );
}
