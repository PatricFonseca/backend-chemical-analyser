import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import * as fs from 'fs';
import { ChemicalAnalysisService } from './chemical-analysis.service';
import { CheckChemicalsDto } from 'src/dto/checkChemicalsDto';

@Controller('chemical-analysis')
export class ChemicalAnalysisController {
  constructor(
    private readonly chemicalAnalysisService: ChemicalAnalysisService,
  ) {}

  @Post('image')
  @UseInterceptors(FileInterceptor('image'))
  async analyzeChemicalComponents(@UploadedFile() file) {
    // Aqui você pode chamar o serviço para processar a imagem
    // Por exemplo, você pode salvar a imagem em um diretório temporário e passar o caminho para o serviço
    const imagePath = `./uploads/${file.originalname}`;
    fs.writeFileSync(imagePath, file.buffer);

    // Chame o serviço para analisar a imagem
    const result = await this.chemicalAnalysisService.analyzeImage(imagePath);

    // Após a análise, você pode remover a imagem temporária
    fs.unlinkSync(imagePath);

    return result;
  }

  @Post('check-composition')
  async checkComposition(@Body() composition: CheckChemicalsDto) {
    console.log(composition)
    const result = await this.chemicalAnalysisService.checkIngredientsWithAI(composition);

    return result;
  }
}
