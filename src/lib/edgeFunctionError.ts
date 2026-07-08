import {
  FunctionsFetchError,
  FunctionsHttpError,
  FunctionsRelayError,
} from "@supabase/supabase-js";

const extractMessage = (payload: unknown) => {
  if (!payload || typeof payload !== "object") return null;
  if ("error" in payload && typeof payload.error === "string") return payload.error;
  if ("message" in payload && typeof payload.message === "string") return payload.message;
  return null;
};

export const getEdgeFunctionErrorMessage = async (error: unknown, fallback: string) => {
  if (error instanceof FunctionsHttpError) {
    try {
      // Read the body once as text, then try to parse it as JSON. Reading
      // .json() first would consume the body and make a .text() fallback throw.
      const text = await error.context.text();
      try {
        const payload: unknown = JSON.parse(text);
        return extractMessage(payload) || text || error.message || fallback;
      } catch {
        return text || error.message || fallback;
      }
    } catch {
      return error.message || fallback;
    }
  }

  if (error instanceof FunctionsRelayError || error instanceof FunctionsFetchError) {
    return error.message || fallback;
  }

  if (error instanceof Error) {
    return error.message || fallback;
  }

  return fallback;
};
