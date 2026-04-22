import { RefObject } from "react";

export function Editor(props: {
   loading: boolean;
   textAreaRef: RefObject<HTMLTextAreaElement | null>;
}) {
   return (
      <textarea
         disabled={props.loading}
         ref={props.textAreaRef}
         className="col-span-4 h-full min-h-0 overflow-auto resize-none outline-0 rounded-sm p-3 border-2 border-DARK disabled:cursor-not-allowed disabled:opacity-50 shadow-2xl bg-LIGHT/5 text-sm font-mono"
         name="text"
         rows={10}
         placeholder="Type..."
      ></textarea>
   );
}
