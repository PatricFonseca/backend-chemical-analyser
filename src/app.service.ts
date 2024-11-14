import { Injectable } from '@nestjs/common';
import { badQuimicWords } from './data/bad-quimic-words';
// import quimicWords from './data/quimic-words.json';
import { readFileSync } from 'fs';
import { CheckChemicalsDto } from './dto/checkChemicalsDto';
// import * as fuzzysort from '@umanghome/fuzzysort';
import * as fuzzysort from 'fuzzysort';
// import levenshtein from 'levenshtein';
// import Levenshtein, { distance } from 'levenshtein';
import * as levenshtein from 'levenshtein';

interface ChemicalAnalyseResultProps extends JSON {
  words: JSON[];
}

interface ChemicalDTO {
  name: string;
  negativeEffect: string;
  matchedText: string;
}

@Injectable()
export class AppService {
  // private lev: Levenshtein;

  // constructor() {
  //   this.lev = new Levenshtein();
  // }

  getHello(): string {
    return 'Hello World!';
  }

  checkChemicals(params: CheckChemicalsDto): ChemicalAnalyseResultProps {
    const words = params.words.split(',');
    // const quimics = {};
    const wordsArray = [];

    console.log('words', words);

    // Verificação com fuzzysort -> testar...
    words.forEach((name) => {
      const result = this.searchChemicals(name);

      console.log('reds', result);

      result.forEach((chemical) => {
        const status = chemical ? chemical.negativeEffect : 'not founded';

        // quimics[chemical.name] = status; // Store status in the object
        wordsArray.push({
          name: chemical.name,
          status,
          matchedText: chemical.matchedText,
        }); // Push word and status to the array
      });
    });

    // Return a JSON object with the array of words and their statuses
    return JSON.parse(JSON.stringify({ words: wordsArray })); //as { words: wordsArray };

    // return quimics;
  }

  searchChemicals(nomeParcial: string): ChemicalDTO[] {
    const execLevenshtein = function () {
      quimicWords.words.forEach((chemical) => {
        chemical.name.map((chim) => {
          console.log(chim);
          const lev = new levenshtein.default(chim, nomeParcial);
          const dist = lev.distance;
          if (dist < 2) {
            resultados.push({
              name: chim,
              negativeEffect: chemical.negativeEffect,
            });
          }
        });
      });
    };

    const quimicWords = JSON.parse(
      readFileSync('src/data/quimic-words.json', 'utf8'),
    );

    const resultados = [];

    // execLevenshtein();

    // const distance = levenshtein.distance('kitten', 'sitting');
    // const lev = levenshtein.distance(chemical.name, nomeParcial);
    // const ratio = levenshtein(chemical.name, nomeParcial).distance;

    // const test = [
    //   {
    //     name: 'petróleo',
    //     negativeEffect: 'Disruptores hormonais',
    //   },
    // ];

    // const result = fuzzysort.search(nomeParcial, test, ['name'], {
    //   algorithm: fuzzysort.algorithmWithTypo,
    //   // cache: cache,
    //   limit: 2,
    // });

    // console.log('Score: ', result);

    // if (result?.score > -10) {
    //   resultados.push({
    //     name: result.target,
    //     negativeEffect: test[0].negativeEffect,
    //   });
    // }

    //Should have negative effect
    // const pontoNegativo = chemical.negativeEffect;

    // console.log(chemical);
    // console.log(pontoNegativo);
    // console.log(nomeParcial);

    for (const words of quimicWords.words) {
      const nomesEncontrados = fuzzysort.go(nomeParcial, words.name, {
        // keys: ['ratio', 'item'],
      });

      // console.log(nomesEncontrados);

      if (nomesEncontrados.total > 0) {
        nomesEncontrados.forEach((result) => {
          // console.log(nomes.token);

          // const matchedString = nomeParcial.substring(
          //   result.index,
          //   result.index + result.length,
          // );

          if (result.score > -204) {
            // console.log(fuzzysort.highlight(result, '<b>', '</b>'));

            resultados.push({
              name: result.target,
              negativeEffect: words.negativeEffect,
              matchedText: fuzzysort.highlight(result, '<b>', '</b>'),
            });
          }
        });
      }
    }

    // for (const names of quimicWords.words) {
    //   const resultT = fuzzysort.search(nomeParcial, names, ['name'], {
    //     algorithm: fuzzysort.algorithmWithTypo,
    //     // cache: cache,
    //     limit: 2,
    //   });

    //   console.log('Score: ', resultT);

    //   if (resultT?.score > -10) {
    //     resultados.push({
    //       name: resultT.target,
    //       negativeEffect: 'pontoNegativo',
    //     });
    //   }

    return resultados;
    // }
  }

 
}



// // Exemplos de uso
// console.log(buscarIngrediente('parab')); // Retorna informações sobre os parabenos
// console.log(buscarIngrediente('silicone')); // Retorna informações sobre os silicones
// console.log(buscarIngrediente('PEG')); // Retorna informações sobre os PEGs
