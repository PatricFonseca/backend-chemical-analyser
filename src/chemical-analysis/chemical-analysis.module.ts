import { Module } from '@nestjs/common';
import { ChemicalAnalysisService } from './chemical-analysis.service';
import { ChemicalAnalysisController } from './chemical-analysis.controller';
import { MulterModule } from '@nestjs/platform-express';
import * as multer from 'multer'; // Adicione esta linha
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MulterModule.register({
      storage: multer.memoryStorage(),
      dest: './uploads',
    }),
  ],
  providers: [ChemicalAnalysisService],
  controllers: [ChemicalAnalysisController],
})
export class ChemicalAnalysisModule {}
