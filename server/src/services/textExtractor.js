import fs from 'fs';
import PDFParser from "pdf2json";
import Tesseract from 'tesseract.js';

export const extractTextFromFile = (file) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (file.mimetype === 'application/pdf') {
        const pdfParser = new PDFParser(this, 1);

        pdfParser.on("pdfParser_dataError", errData => {
          console.error(errData.parserError);
          reject(new Error('Error parsing PDF file.'));
        });

        pdfParser.on("pdfParser_dataReady", () => {
          const rawText = pdfParser.getRawTextContent();
          resolve(rawText);
        });

        pdfParser.loadPDF(file.path);

      } else if (file.mimetype.startsWith('image/')) {
        const { data: { text } } = await Tesseract.recognize(file.path, 'eng');
        resolve(text);
      } else {
        reject(new Error('Unsupported file type.'));
      }
    } catch (error) {
        reject(error);
    }
  });
};