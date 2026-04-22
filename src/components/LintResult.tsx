import { Loader } from "./Loader";
import { LintResultOveride } from "../lib/types";

type LintResultProps = {
   loading: boolean;
   lintResult: LintResultOveride[];
   error: string | null;
   closeDiagnostics: () => void;
};

export function LintResult({
   loading,
   lintResult,
   error,
   closeDiagnostics,
}: LintResultProps) {
   const lintResultDisplay = lintResult
      .map((r) => `lines ${r.start_line}-${r.end_line}:\n${r.overview}`)
      .join("\n\n");
   return (
      <div className="bg-DARK text-red-300 flex flex-col ">
         <div className="p-3 grow mb-auto overflow-y-auto">
            {loading ? (
               <Loader />
            ) : (
               <pre className="text-wrap">
                  {error || lintResultDisplay || "No issues detected."}
               </pre>
            )}
         </div>

         <button
            disabled={!lintResult.length && !error}
            className="w-full"
            onClick={closeDiagnostics}
         >
            clear
         </button>
      </div>
   );
}
