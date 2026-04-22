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
   const lintResultDisplay = lintResult.length
      ? lintResult.map((r, i) => (
           <div key={i} className={`py-2 ${i === 0 ? "" : "border-t-2"}`}>
              <mark className="bg-red-300 text-DARK p-0.5 font-bold text-sm">{`lines ${r.start_line}-${r.end_line}\n`}</mark>
              {r.overview}
           </div>
        ))
      : null;

   return (
      <div className="bg-DARK text-red-300 flex flex-col min-h-0 overflow-hidden">
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
