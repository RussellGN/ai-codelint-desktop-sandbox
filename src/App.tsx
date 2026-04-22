import useApp from "./hooks/useApp";
import { Editor } from "./components/Editor";
import { LintResult } from "./components/LintResult";

export default function App() {
   const {
      error,
      loading,
      fileInputRef,
      lintResult,
      textAreaRef,
      openFile,
      onFileChange,
      onLintContents,
      closeDiagnostics,
   } = useApp();

   return (
      <div className="h-screen flex flex-col p-5">
         <div className="flex gap-5 items-center mb-5">
            <h1 className="mr-auto">AI CodeLint Desktop Sandbox</h1>

            <input
               disabled={loading}
               ref={fileInputRef}
               onChange={onFileChange}
               type="file"
               className="hidden"
            />
            <button disabled={loading} onClick={openFile} className="">
               Open file
            </button>
            <button disabled={loading} onClick={onLintContents} className="">
               Lint Contents
            </button>
         </div>

         <div className="grow grid grid-cols-5">
            <LintResult
               loading={loading}
               error={error}
               lintResult={lintResult}
               closeDiagnostics={closeDiagnostics}
            />
            <Editor loading={loading} textAreaRef={textAreaRef} />
         </div>
      </div>
   );
}
