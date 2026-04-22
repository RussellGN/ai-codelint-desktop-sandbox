import useLinter from "./useLinter";
import { useRef, useState } from "react";
import { LintResultOveride } from "../lib/types";

export default function useApp() {
   const { lintContents } = useLinter();
   const [lintResult, setLintResult] = useState<LintResultOveride[]>([]);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState<string | null>(null);
   const fileInputRef = useRef<HTMLInputElement>(null);
   const textAreaRef = useRef<HTMLTextAreaElement>(null);

   function openFile() {
      if (fileInputRef.current) {
         fileInputRef.current.click();
      }
   }

   function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
      const file = e.target.files?.[0];
      if (file) {
         const reader = new FileReader();
         reader.onload = (event) => {
            if (textAreaRef.current) {
               textAreaRef.current.value = event.target?.result as string;
            }
         };
         reader.readAsText(file);
      }
   }

   async function onLintContents() {
      setLoading(true);
      setLintResult([]);
      if (textAreaRef.current) {
         const contents = textAreaRef.current.value;
         try {
            const res = await lintContents(contents);
            setLintResult(res);
         } catch (error) {
            setError("An error occurred while linting. " + (error instanceof Error ? error.message : String(error)));
         }
         setLoading(false);
      }
   }

   function closeDiagnostics() {
      setLintResult([]);
      setError(null);
   }

   return { error, loading, lintResult, textAreaRef, fileInputRef, openFile, onFileChange, onLintContents, closeDiagnostics };
}
