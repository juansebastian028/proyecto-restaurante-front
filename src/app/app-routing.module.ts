import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivateChild: [AuthGuard],
    children: [
      { path: '', 
        loadChildren: () => import('./modules/home/home.module').then(mod => mod.HomeModule),
        data: {}
      },
      { path: 'shopping-cart', 
        loadChildren: () => import('./modules/shopping-cart/shopping-cart.module').then(mod => mod.ShoppingCartModule),
        data: {} 
      },
      { path: 'users', 
        loadChildren: () => import('./modules/users/users.module').then(mod => mod.UsersModule),
        data: {
          allowedProfiles: ['super_admin']
        } 
      },
      { path: 'cities', 
        loadChildren: () => import('./modules/cities/cities.module').then(mod => mod.CitiesModule),
        data: {
          allowedProfiles: ['super_admin']
        }
      },
      { path: 'products',  
        loadChildren: () => import('./modules/products/products.module').then(mod => mod.ProductsModule),
        data: {
          allowedProfiles: ['super_admin']
        }
      },
      { path: 'branches', 
        loadChildren: () => import('./modules/branches/branches.module').then(mod => mod.BranchesModule),
        data: {
        allowedProfiles: ['super_admin', 'admin']
        }
      },
      { path: 'make-shopping', 
        loadChildren: () => import('./modules/make-shopping/make-shopping.module').then(mod => mod.MakeShoppingModule),
        data: {
          allowedProfiles: ['super_admin', 'admin', 'e-commerce']
        }
      },
      { path: 'orders', 
        loadChildren: () => import('./modules/orders/orders.module').then(mod => mod.OrdersModule),
        data: {
          allowedProfiles: ['super_admin', 'admin', 'e-commerce']
        }
      },
      { path: 'my-account', 
        loadChildren: () => import('./modules/my-account/my-account.module').then(mod => mod.MyAccountModule),
        data: {
          allowedProfiles: ['super_admin', 'admin', 'e-commerce']
        }
      },     
    ]
  },
  { path: 'login',
    loadChildren: () => import('./modules/login/login.module').then(mod => mod.LoginModule),
  },
  { path: 'register',
    loadChildren: () => import('./modules/register/register.module').then(mod => mod.RegisterModule),
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
