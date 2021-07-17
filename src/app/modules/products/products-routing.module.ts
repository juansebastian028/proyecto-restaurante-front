import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from 'src/app/pages/categories/categories.component';
import { ModifierGroupsComponent } from 'src/app/pages/modifier-groups/modifier-groups.component';
import { ModifiersComponent } from 'src/app/pages/modifiers/modifiers.component';
import { ProductsComponent } from 'src/app/pages/products/products.component';

const routes: Routes = [
  { path: '', component: ProductsComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: 'modifier-groups', component: ModifierGroupsComponent },
  { path: 'modifiers', component: ModifiersComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
