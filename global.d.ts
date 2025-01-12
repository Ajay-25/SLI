interface TranslateElementOptions {
  pageLanguage?: string;
  autoDisplay?: boolean;
  includedLanguages?: string;
  layout?: string; // This will correspond to InlineLayout types
}

interface TranslateElement {
  // Define other methods and properties if needed
}

declare global {
  interface Window {
    googleTranslateElementInit: () => void;
    google: {
      translate: {
        TranslateElement: {
          new (
            options: TranslateElementOptions,
            elementId: string,
          ): TranslateElement;
          InlineLayout: {
            SIMPLE: string;
          };
        };
      };
    };
  }
}

export {};
