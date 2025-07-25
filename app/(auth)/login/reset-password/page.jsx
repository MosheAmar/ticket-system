"use client";

import ResetPassword from "./ResetPassword";
import { Suspense } from "react";

export default function page() {
    
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPassword />
    </Suspense>
  );
}
