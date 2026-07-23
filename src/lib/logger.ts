export interface LogContext {
  rollNo?: string;
  provider?: string;
  durationMs?: number;
  statusCode?: number;
  errorCode?: string;
  [key: string]: unknown;
}

export class Logger {
  private static maskRollNo(rollNo?: string): string {
    if (!rollNo) return "N/A";
    if (rollNo.length <= 6) return "***";
    return `${rollNo.slice(0, 4)}****${rollNo.slice(-4)}`;
  }

  public static info(message: string, context: LogContext = {}) {
    const entry = {
      timestamp: new Date().toISOString(),
      level: "INFO",
      message,
      ...context,
      rollNo: context.rollNo ? this.maskRollNo(context.rollNo) : undefined,
    };
    console.log(`[INFO] [${entry.timestamp}] ${message}`, JSON.stringify(entry));
  }

  public static warn(message: string, context: LogContext = {}) {
    const entry = {
      timestamp: new Date().toISOString(),
      level: "WARN",
      message,
      ...context,
      rollNo: context.rollNo ? this.maskRollNo(context.rollNo) : undefined,
    };
    console.warn(`[WARN] [${entry.timestamp}] ${message}`, JSON.stringify(entry));
  }

  public static error(message: string, context: LogContext = {}) {
    const entry = {
      timestamp: new Date().toISOString(),
      level: "ERROR",
      message,
      ...context,
      rollNo: context.rollNo ? this.maskRollNo(context.rollNo) : undefined,
    };
    console.error(`[ERROR] [${entry.timestamp}] ${message}`, JSON.stringify(entry));
  }
}
