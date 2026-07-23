import { ResultData } from "@/types";

export interface ResultProvider {
  getResult(rollNo: string): Promise<ResultData | null>;
}
