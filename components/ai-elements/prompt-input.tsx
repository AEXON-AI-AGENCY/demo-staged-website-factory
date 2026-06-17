"use client"

export type PromptInputController = {
  textInput: {
    setInput: (value: string) => void
  }
}

/**
 * Optional integration point for Cult UI's prompt-library component.
 * The demo factory does not currently mount a shared AI prompt input provider,
 * so this returns null and prompt-library falls back to copying to clipboard.
 */
export function useOptionalPromptInputController(): PromptInputController | null {
  return null
}
