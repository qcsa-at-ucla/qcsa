"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SponsorSuccess() {
  const router = useRouter();

  useEffect(() => {
    const t = setTimeout(() => {
      router.push("/");
    }, 1500);

    return () => clearTimeout(t);
  }, [router]);

  return (
    <div style={{ padding: 24, textAlign: "center" }}>
      <h1>Payment successful</h1>
      <p>Redirecting you back to the main page...</p>
    </div>
  );
}