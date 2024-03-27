import { Test, TestingModule } from '@nestjs/testing';
import { ChemicalAnalysisController } from './chemical-analysis.controller';

describe('ChemicalAnalysisController', () => {
  let controller: ChemicalAnalysisController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChemicalAnalysisController],
    }).compile();

    controller = module.get<ChemicalAnalysisController>(ChemicalAnalysisController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
