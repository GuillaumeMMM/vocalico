import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { LayoutComponent } from './components/layout/layout.component';
import { FileInputComponent } from './components/home/file-input/file-input.component';
import { ExerciseComponent } from './components/exercise/exercise.component';
import { ExerciseTypesListComponent } from './components/exercise/exercise-types-list/exercise-types-list.component';
import { ExerciseContentComponent } from './components/exercise/exercise-content/exercise-content.component';
import { QuestionComponent } from './components/exercise/exercise-content/question/question.component';
import { InfoComponent } from './components/info/info.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    LayoutComponent,
    FileInputComponent,
    ExerciseComponent,
    ExerciseTypesListComponent,
    ExerciseContentComponent,
    QuestionComponent,
    InfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
