import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChemicalAnalysisModule } from './chemical-analysis/chemical-analysis.module';

@Module({
  imports: [ConfigModule.forRoot(), ChemicalAnalysisModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
