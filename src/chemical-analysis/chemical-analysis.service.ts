import { Injectable } from '@nestjs/common';
import { GoogleGenerativeAI } from '@google/generative-ai';
import fs from 'fs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ChemicalAnalysisService {
  private readonly genAI: GoogleGenerativeAI;

  constructor(private configService: ConfigService) {
    this.genAI = new GoogleGenerativeAI(
      this.configService.get<string>('GEMINI_API_KEY'),
    );
  }
  // Converts local file information to a GoogleGenerativeAI.Part object.
  fileToGenerativePart(path, mimeType) {
    return {
      inlineData: {
        data: Buffer.from(fs.readFileSync(path)).toString('base64'),
        mimeType,
      },
    };
  }

  async analyzeImage(imagePath: string): Promise<string> {
    // For text-and-image input (multimodal), use the gemini-pro-vision model
    const model = this.genAI.getGenerativeModel({ model: 'gemini-pro-vision' });

    const prompt =
      'Analyze the chemical composition of the following image, returning all the chemical composition in json format';
    // const prompt =
    //   'Consider you are seeing a document, return all the informations that you can in json format';

    const imageParts = [this.fileToGenerativePart(imagePath, 'image/jpeg')];

    console.log(imageParts);

    const result = await model.generateContent([prompt, ...imageParts]);
    const response = await result.response;
    const text = response.text();
    console.log(text);
    return text;
  }
}
