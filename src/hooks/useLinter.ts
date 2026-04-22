import { invoke } from "@tauri-apps/api/core";
import { LintResultOveride } from "../lib/types";

export default function useLinter() {
   async function lintContents(contents: string) {
      const res = await invoke<LintResultOveride[]>("lint_contents", { contents });
      return res;
      // "An error occurred while linting. " + (error instanceof Error ? error.message : String(error));
   }

   return { lintContents };
}
