import { Component, OnInit, Input, Output, EventEmitter, SimpleChange, ChangeDetectorRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  @Input() question: any;
  @Input() wrongAnswer: boolean;
  @Output() answer: EventEmitter<string> = new EventEmitter;
  @Output() nextQuestion: EventEmitter<boolean> = new EventEmitter;

  @ViewChild('answerInput') answerInput;

  public inputValue: string = '';
  public error: string = '';
  public testContent: string = '';

  constructor(public changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit() {
  }

  ngOnChanges(change: SimpleChange) {
    if (change && change['question'] && change['question']['currentValue'] && !change['question']['previousValue']) {
      this.resizeText(this.question.q, 'question');
    }
    if (change && change['wrongAnswer'] && change['wrongAnswer']['currentValue'] && !change['wrongAnswer']['previousValue']) {
      this.resizeText(this.question.a, 'answer');
    }
    if (change && change['question'] && change['question']['currentValue']) {
      this.focusInput();
    }
  }

  onResize = () => {
    setTimeout(() => {
      if (!this.wrongAnswer) {
        this.resizeText(this.question.q, 'question');
      } else {
        this.resizeText(this.question.a, 'answer');
      }
    }, 1000);
  }

  resizeText = (textString, idElement) => {
    if (textString) {
      let longestWord = '';
      textString.split(' ').forEach(word => {
        if (word.length > longestWord.length) {
          longestWord = word;
        }
      });

      this.changeDetectorRef.detectChanges();
      const elementToChangeFontsize = document.getElementById(idElement);
      elementToChangeFontsize.style.fontSize = '4rem';
      if (elementToChangeFontsize) {
        this.testContent = longestWord;
        this.changeDetectorRef.detectChanges();
        const testZoneElm = document.getElementById('test-zone');
        testZoneElm.style.fontSize = '4rem';
        const styleSize = window.getComputedStyle(elementToChangeFontsize, null).getPropertyValue('font-size');
        let textSize = parseFloat(styleSize); 
        this.changeDetectorRef.detectChanges();
        setTimeout(() => {
          while (testZoneElm.getBoundingClientRect().width > (testZoneElm.parentElement.offsetWidth - 30) && textSize > 10) {
            textSize -= 1;
            testZoneElm.style.fontSize = textSize + 'px';
            this.changeDetectorRef.detectChanges();
          }
          elementToChangeFontsize.style.fontSize = textSize + 'px';
          this.changeDetectorRef.detectChanges();
          this.testContent = '';
        });
        this.changeDetectorRef.detectChanges();
      }
    }
  }

  onSubmit = () => {
    if (this.inputValue) {
      this.answer.emit(this.inputValue);
      setTimeout(() => {
        this.resetForm();
      })
    } else {
      this.error = 'No answer to submit';
    }
  }

  onNextQuestion = () => {
    this.nextQuestion.emit(true);
  }

  resetForm = () => {
    this.error = '';
    this.inputValue = '';
  }

  focusInput = () => {
    this.changeDetectorRef.detectChanges();
    this.answerInput.nativeElement.focus({preventScroll: true});
  }

}
