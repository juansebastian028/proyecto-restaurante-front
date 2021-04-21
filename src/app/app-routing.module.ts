import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//Components
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { UsersComponent } from './pages/users/users.component';
import { ShoppingCartComponent } from './pages/shopping-cart/shopping-cart.component';
import { LayoutComponent } from './layout/layout.component';
import { MakeShoppingComponent } from './pages/make-shopping/make-shopping.component';
import { ProductsComponent } from './pages/products/products.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { CitiesComponent } from './pages/cities/cities.component';
import { ModifierGroupsComponent } from './pages/modifier-groups/modifier-groups.component';
import { ModifiersComponent } from './pages/modifiers/modifiers.component';
import { BranchesComponent } from './pages/branches/branches.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'users', component: UsersComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'categories', component: CategoriesComponent },
      { path: 'modifier-groups', component: ModifierGroupsComponent },
      { path: 'modifiers', component: ModifiersComponent},
      { path: 'shopping-cart', component: ShoppingCartComponent },
      { path: 'make-shopping', component: MakeShoppingComponent },
      { path: 'branches', component: BranchesComponent },
      { path: 'cities', component: CitiesComponent },
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
