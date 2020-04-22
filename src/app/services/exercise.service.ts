import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {

  CHARACH_ERROR_ACCEPTED = 1;

  constructor() { }

  getQuestionsFromList = (list, exercise) => {
    const questions = [];
    if (list && list.words && list.words.length > 0) {
      list.words.forEach(word => {
        let question: string;
        let answer: string;
        if (word['types'] && word['types'].length > 0 && word['types'].filter(type => type.name === exercise.from).length > 0) {
          question = word['types'].filter(type => type.name === exercise.from)[0].value; 
        }
        if (word['types'] && word['types'].length > 0 && word['types'].filter(type => type.name === exercise.to).length > 0) {
          answer = word['types'].filter(type => type.name === exercise.to)[0].value;
        }
        if (question && answer) {
          questions.push({q: question, a: answer});
        }
      });
    }
    return questions;
  }

  getNextQuestion = (avaliableQuestions, previousQuestion) => {
    const rand = Math.random();
    let question: any;
    if (avaliableQuestions && avaliableQuestions.length > 0) {
      let currentTotProb = 0;
      for (let i = 0; i < avaliableQuestions.length - 1; i++) {
        if (rand > currentTotProb && rand <= currentTotProb + avaliableQuestions[i].proba) {
          if (avaliableQuestions[i].q === previousQuestion.q && avaliableQuestions[i].a === previousQuestion.a) {
            question = Object.assign(avaliableQuestions[(i + 1) % avaliableQuestions.length], {});
          } else {
            question = Object.assign(avaliableQuestions[i], {});
          }
        }
        currentTotProb += avaliableQuestions[i].proba;
      }
    }
    return question ? question : avaliableQuestions[0];
  }

  isCorrectAnswerToQuestion = (goodAnswer, submittedAnswer) => {
    return this.areAlmostTheSame(this.cleanString(goodAnswer), this.cleanString(submittedAnswer), this.CHARACH_ERROR_ACCEPTED);
  }

  cleanString = (str) => {
    return str.trim().toLowerCase();
  }

  areAlmostTheSame = (str1, str2, maxErrorCount) => {
    let errorsCount = 0;
    if (str1.length === str2.length) {
      str1.split('').forEach((str1Char, i) => {
        if (str1Char !== str2.split('')[i]) {
          errorsCount ++;
        }
      });
    } else {
      if (Math.abs(str1.length - str2.length) <= maxErrorCount) {
        const longer = str1.length > str2.length ? str1 : str2;
        const shorter: string = str1.length < str2.length ? str1 : str2;
        let almostTheSame: boolean = false;
        shorter.split('').forEach((char, i) => {
          if (this.areAlmostTheSame(longer, shorter.substr(0, i) + '*' + shorter.substr(i, shorter.length - i), maxErrorCount)) {
            almostTheSame = true;
          }
        });
        if (almostTheSame) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    }
    return errorsCount <= maxErrorCount;
  }
}
