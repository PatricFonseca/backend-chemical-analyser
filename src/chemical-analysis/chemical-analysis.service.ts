import { Injectable } from '@nestjs/common';
import { GoogleGenerativeAI } from '@google/generative-ai';
import fs from 'fs';
import { ConfigService } from '@nestjs/config';
import { CheckChemicalsDto } from 'src/dto/checkChemicalsDto';

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
    // const model = this.genAI.getGenerativeModel({ model: 'gemini-pro-vision' });
    const model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    // const fieldsResult =
    //   '"product": "Name of the product", "composition": "Portuguese name of the composition" ';
    // const prompt =
    //   'Analyze the chemical composition of the following image, returning ALL the chemical composition in json format, bring it in a format like: ' +
    //   fieldsResult +
    //   ' . Write in Portuguese(br) in the format: "' +
    //   fieldsResult +
    //   '"';
      
    const fieldsResult = '"product": "Nome do produto", "composition": "Composição química em português"';

    // ${fieldsResult}
    const prompt = `Analise a composição química da imagem abaixo, **focando em ingredientes como água, álcoois, óleos, extratos, conservantes e fragrâncias**. Retorne TODA a composição química em formato JSON, **em português brasileiro** e **listando todos os ingredientes individuais**, seguindo o formato:
    ${fieldsResult}
    Consulte a base de dados INCI para obter informações mais precisas sobre os ingredientes. Não precisa focar só na imagem, caso vc identifique o produto, procure na internet para concluir os ingredientes
    faça no formato ${fieldsResult}`

    const imageParts = [this.fileToGenerativePart(imagePath, 'image/jpeg')];

    console.log(imageParts);

    const result = await model.generateContent([prompt, ...imageParts]);
    const response = result.response;
    let text = response.text();

    text = text.replace('```json', '');
    text = text.replace('```', '');

    return JSON.parse(JSON.stringify(text));
  }

  async checkIngredientsWithAI(composition: CheckChemicalsDto): Promise<string>{
    const model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
  
    // const prompt = `Considerando a lista ${composition.words}, retorne todos os componentes que fazem mal para saúde, 
    // retorne no formato extritamente em json: 
 
    //   name: chemical.name,
    //   status,
    //   matchedText: chemical.matchedText
   
    //   caso tennha algum contéudo importante como explicação, jogue dentro de uma nova key, como adicionais. 
    //   O formato de retorno, deve ser um json
    // `

    const prompt = `Analise a lista de componentes químicos: ${composition.words}. Identifique todos os componentes que são **potencialmente tóxicos, alérgenos ou cancerígenos** para a saúde humana. Retorne os resultados em formato JSON, seguindo a estrutura abaixo:",
  "response_format": {
    "type": "json",
    "structure": [
      {
        "name": "Nome do componente",
        "status": "Tóxico/Alérgeno/Cancerígeno/Seguro/Indeterminado",
        "matchedText": "Texto original da lista que correspondeu ao componente",
        
      }
    ]`;
    
// "adicionais": {
  // "sinônimos": ["Lista de sinônimos do componente"],
  // "fontes": ["Links para as fontes de informação sobre a toxicidade"],
  // "precauções": ["Recomendações de uso seguro"]
// }

    const res = await model.generateContent([prompt]);

    // wordsArray.push({
    //   name: chemical.name,
    //   status,
    //   matchedText: chemical.matchedText,
    // }); // Push word and status to the array
  // });
// });

// Return a JSON object with the array of words and their statuses
// return JSON.parse(JSON.stringify({ words: wordsArray }));

    const response = res.response;
    let text = response.text();


    text = text.replace('```json', '');
    text = text.replace('```', '');

    let indiceDoFechamento = text.indexOf("]");

// Extrai a parte da string antes do fechamento
    let parteDesejada = text.substring(0, indiceDoFechamento+1);
    console.log('te', parteDesejada)

    return JSON.parse(JSON.stringify(parteDesejada));
    // return JSON.parse(JSON.stringify({ res }))
    // return JSON.parse(JSON.stringify(res));
  }
 
}
