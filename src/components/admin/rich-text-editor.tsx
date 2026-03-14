"use client";

import { useMemo, useState } from "react";

type RichTextEditorProps = {
  name: string;
  defaultValue?: string;
  label: string;
};

type EditorControl = {
  label: string;
  command: string;
  value?: string;
};

const controls: EditorControl[] = [
  { label: "Gras", command: "bold" },
  { label: "Italique", command: "italic" },
  { label: "Liste", command: "insertUnorderedList" },
  { label: "Titre", command: "formatBlock", value: "h3" },
];

export function RichTextEditor({ name, defaultValue = "", label }: RichTextEditorProps) {
  const [value, setValue] = useState(defaultValue);
  const editorId = useMemo(() => `${name}-editor`, [name]);

  return (
    <div className="space-y-2">
      <label htmlFor={editorId} className="text-sm font-medium text-foreground">
        {label}
      </label>

      <div className="rounded-lg border border-border bg-card">
        <div className="flex flex-wrap gap-2 border-b border-border p-2">
          {controls.map((control) => (
            <button
              key={control.label}
              type="button"
              className="rounded-md border border-border bg-background px-2 py-1 text-xs text-foreground hover:bg-muted"
              onClick={() => {
                document.execCommand(control.command, false, control.value);
                const editor = document.getElementById(editorId);
                if (editor) {
                  setValue(editor.innerHTML);
                }
              }}
            >
              {control.label}
            </button>
          ))}
        </div>

        <div
          id={editorId}
          contentEditable
          suppressContentEditableWarning
          className="min-h-44 w-full rounded-b-lg bg-card p-3 text-sm text-foreground focus:outline-none"
          dangerouslySetInnerHTML={{ __html: defaultValue }}
          onInput={(event) => setValue(event.currentTarget.innerHTML)}
        />
      </div>

      <input type="hidden" name={name} value={value} />
    </div>
  );
}
