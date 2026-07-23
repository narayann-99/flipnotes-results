"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import RollInput from "@/components/RollInput";
import LoadingScreen from "@/components/LoadingScreen";

export default function RollInputContainer() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleResultSearch = async (rollNo: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/result", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rollNo }),
      });

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("Result not found. Check your roll number and try again.");
        } else {
          throw new Error("Unable to connect to the server. Please try again later.");
        }
      }

      router.push(`/result/${rollNo}`);
    } catch (err: unknown) {
      setIsLoading(false);
      setError(err instanceof Error ? err.message : "An error occurred.");
    }
  };

  return (
    <>
      <RollInput onSubmit={handleResultSearch} isLoading={isLoading} initialError={error} />
      <LoadingScreen isVisible={isLoading} />
    </>
  );
}
