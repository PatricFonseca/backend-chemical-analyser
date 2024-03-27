import { Test, TestingModule } from '@nestjs/testing';
import { ChemicalAnalysisService } from './chemical-analysis.service';

describe('ChemicalAnalysisService', () => {
  let service: ChemicalAnalysisService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChemicalAnalysisService],
    }).compile();

    service = module.get<ChemicalAnalysisService>(ChemicalAnalysisService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
