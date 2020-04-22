import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ExerciseComponent } from './components/exercise/exercise.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'exercise', component: ExerciseComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
