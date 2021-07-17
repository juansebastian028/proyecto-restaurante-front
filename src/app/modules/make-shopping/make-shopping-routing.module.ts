import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MakeShoppingComponent } from 'src/app/pages/make-shopping/make-shopping.component';

const routes: Routes = [
  { path: '', component: MakeShoppingComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MakeShoppingRoutingModule { }
