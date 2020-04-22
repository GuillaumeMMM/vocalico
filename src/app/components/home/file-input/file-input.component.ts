import { Component, OnInit } from '@angular/core';
import { ListService } from 'src/app/services/list.service';

@Component({
  selector: 'app-file-input',
  templateUrl: './file-input.component.html',
  styleUrls: ['./file-input.component.scss']
})
export class FileInputComponent implements OnInit {

  public file: any;
  public error: string;

  constructor(public listService: ListService) { }

  ngOnInit() {
  }

  fileInputClicked = () => {
    document.getElementById('mylist').click();
  }

  fileInputChanged = (event) => {
    this.handleFiles(event);
  }

  handleFiles = (event) => {
    this.error = '';
    console.log(event.target.files[0])
    if (event.target.files[0] && event.target.files[0].type === 'text/csv') {
      console.log('read')
      this.file = event.target.files[0];
      this.readFile(this.file);
    } else {
      console.log('error')
      this.error = 'Wrong file format';
    }
  }

  readFile(file) {
    const reader = new FileReader();
    reader.readAsText(file, "UTF-8");
    reader.onload = (evt: any) => {
      console.log(evt)
      const rawList: any = evt.target.result;
      const lines = rawList.split('\n');
      const categories = lines[0].split(';');
      const words = [];
      for (let i = 1; i < lines.length; i++) {
        let word = { types: [] }
        let wordValues = lines[i].split(';');
        for (let j = 0; j < wordValues.length; j++) {
          word.types.push({ name: categories[j], value: wordValues[j] });
        }
        words.push(word);
      }
      this.listService.list = {words: words, categories: categories};
      localStorage.setItem('list-test', JSON.stringify(this.listService.list));
    }
    reader.onerror = (evt) => {
      this.error = 'Error reading file';
    }
  }

}
