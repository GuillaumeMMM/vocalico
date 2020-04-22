import { Component, OnInit, Input, SimpleChange } from '@angular/core';
import { ListService } from 'src/app/services/list.service';
import { ExerciseService } from 'src/app/services/exercise.service';

@Component({
  selector: 'app-exercise-content',
  templateUrl: './exercise-content.component.html',
  styleUrls: ['./exercise-content.component.scss']
})
export class ExerciseContentComponent implements OnInit {

  @Input() exercise;

  INITIAL_QUESTIONS_COUNT: number = 10;
  REFILL_QUESTIONS_COUNT: number = 20;

  public avaliableQuestions: any[];
  public questions: any[] = [];
  public currentQuestionIndex: number = 0;
  public countOfCorrectANswers: number = 0;
  public wrongAnswer: boolean = false;

  constructor(public listService: ListService, public exerciseService: ExerciseService) { }

  ngOnInit() {
  }

  ngOnChanges(change: SimpleChange) {
    if (change && change['exercise'] && change['exercise']['currentValue']) {
      this.avaliableQuestions = this.exerciseService.getQuestionsFromList(this.listService.list, change['exercise']['currentValue']);
      this.addProbabilitiesToAValiableQuestions();
      this.fillInitialQuestions();
    }
  }

  addProbabilitiesToAValiableQuestions = () => {
    if (this.avaliableQuestions && this.avaliableQuestions.length > 0) {
      this.avaliableQuestions.map(question => {
        question.proba = 1 / this.avaliableQuestions.length;
        return question;
      });
    }
  }

  fillInitialQuestions = () => {
    for (let i = 0; i < this.INITIAL_QUESTIONS_COUNT; i++) {
      this.questions.push(this.exerciseService.getNextQuestion(this.avaliableQuestions, this.questions.length > 0 ? this.questions[this.questions.length - 1] : []));
    }
  }

  refillQuestions = () => {
    for (let i = 0; i < this.REFILL_QUESTIONS_COUNT; i++) {
      this.questions.push(this.exerciseService.getNextQuestion(this.avaliableQuestions, this.questions.length > 0 ? this.questions[this.questions.length - 1] : []));
    }
  }

  handleAnswer = (answer) => {
    if (answer) {
      if (this.exerciseService.isCorrectAnswerToQuestion(this.questions[this.currentQuestionIndex].a, answer)) {
        this.countOfCorrectANswers ++;
        this.nextQuestion();
      } else {
        this.wrongAnswer = true;
      }
    }
  }

  nextQuestion = () => {
    this.wrongAnswer = false;
    if (this.currentQuestionIndex === this.questions.length - 1) {
      this.refillQuestions();
    }
    this.currentQuestionIndex ++;
  }



}
