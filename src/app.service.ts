import { Injectable } from '@nestjs/common';
import { badQuimicWords } from './data/bad-quimic-words';
import { CheckChemicalsDto } from './dto/checkChemicalsDto';

interface ChemicalAnalyseResultProps extends JSON {
  words: JSON[];
}

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  checkChemicals(params: CheckChemicalsDto): ChemicalAnalyseResultProps {
    const words = params.words.split(',');
    const quimics = {};
    const wordsArray = [];

    words.forEach((word) => {
      const badQuimicIndex = badQuimicWords.words.findIndex(
        (qmWord) => word === qmWord,
      );
      const status = badQuimicIndex > -1 ? 'bad' : 'not founded';

      quimics[word] = status; // Store status in the object
      wordsArray.push({ word, status }); // Push word and status to the array
    });

    // Return a JSON object with the array of words and their statuses
    return JSON.parse(JSON.stringify({ words: wordsArray })); //as { words: wordsArray };

    // let quimics = {} as JSON;

    // words.map((word) => {
    //   const badQuimicIndex = badQuimicWords.words.findIndex((qmWord) => {
    //     return word === qmWord;
    //   });

    //   if (badQuimicIndex > -1) {
    //     quimics[word] = 'bad';
    //   } else {
    //     quimics[word] = 'not founded';
    //   }
    // });

    // return quimics;
  }
}
