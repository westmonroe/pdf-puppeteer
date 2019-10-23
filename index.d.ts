declare module 'pdf-puppeteer' {
    import { PDFOptions, LaunchOptions } from 'puppeteer';

    function convertHTMLToPDF(
      html: string,
      callback: (data: Buffer) => void,
      options?: PDFOptions,
      puppeteerArgs?: LaunchOptions,
      remoteContent?: boolean,
    ): Promise<void>;

    export = convertHTMLToPDF;
  }
