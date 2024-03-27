// Importar as dependências necessárias
import { Injectable } from '@nestjs/common';
// import { Client } from '@gemini/gemini-client';
// import { google } from 'googleapis';

// Criar um serviço para processar a imagem e retornar os componentes químicos
@Injectable()
export class ChemicalCompositionService {
  // private readonly client: Client;
  // constructor() {
  //   // Criar um cliente da API Gemini
  //   this.client = new Client({
  //     apiKey: 'SUA_CHAVE_API_GEMINI',
  //   });
  //   google.
  // }
  // // Função para analisar a imagem e retornar os componentes químicos
  // async analyzeImage(image: Buffer): Promise<string[]> {
  //   // Chamar a API Gemini para identificar os componentes químicos na imagem
  //   const response = await this.client.analyzeImage(image);
  //   // Extrair os nomes dos componentes químicos da resposta
  //   const chemicalComponents = response.results.map((result) => result.name);
  //   // Retornar a lista de componentes químicos
  //   return chemicalComponents;
  // }
}

// curl \
//   -H 'Content-Type: application/json' \
//   -d '{"contents":[{"parts":[{"text":"Write a story about a magic backpack"}]}]}' \
//   -X POST 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=YOUR_API_KEY'
