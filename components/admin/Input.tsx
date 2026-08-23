import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`w-full font-mono text-[0.87rem] bg-bg-raised border border-border rounded-[3px] px-3 py-2 text-text focus:outline-none focus:border-accent ${props.className ?? ""}`}
    />
  );
}

export function Textarea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={`w-full font-serif text-[0.92rem] leading-relaxed bg-bg-raised border border-border rounded-[3px] px-3 py-2 text-text focus:outline-none focus:border-accent ${props.className ?? ""}`}
    />
  );
}
