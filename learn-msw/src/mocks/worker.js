import { setupWorker } from "msw";
import { todoHandlers } from "./todoHandlers";

export const worker = setupWorker(...todoHandlers);