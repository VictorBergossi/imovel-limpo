declare module 'pdf2json' {
  export default class PDFParser {
    on(event: 'pdfParser_dataError', callback: (errData: { parserError: Error }) => void): void
    on(event: 'pdfParser_dataReady', callback: (pdfData: unknown) => void): void
    parseBuffer(buffer: Buffer): void
    getRawTextContent(): string
  }
}


