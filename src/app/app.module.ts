import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormLoginComponent } from './components/auth-forms/form-login/login.component';
import { FormRegisterComponent } from './components/auth-forms/form-register/form-register.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './pages/home/home.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule }   from '@angular/forms';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeroImageComponent } from './components/hero-image/hero-image.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { UsersComponent } from './pages/users/users.component';
import { TableComponent } from './components/table/table.component';
import { MaterialModule } from './material/material.module';

import { CardComponent } from './components/card/card.component';
import { TabsComponent } from './components/tabs/tabs/tabs.component';
import { TabComponent } from './components/tabs/tab/tab.component';
import { EditUserComponent } from './components/user/edit-user/edit-user.component';

import { HelperService } from './services/helper.service';
import { ShoppingCartComponent } from './pages/shopping-cart/shopping-cart.component';
import { ModalComponent } from './components/modal/modal.component';
import { SelectCityComponent } from './components/select-city/select-city.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LayoutComponent } from './layout/layout.component';
import { MakeShoppingComponent } from './pages/make-shopping/make-shopping.component';

@NgModule({
  declarations: [
    AppComponent,
    FormLoginComponent,
    FormRegisterComponent,
    NavbarComponent,
    HomeComponent,
    SideMenuComponent,
    HeroImageComponent,
    LoginComponent,
    RegisterComponent,
    UsersComponent,
    TableComponent,
    CardComponent,
    TabsComponent,
    TabComponent,
    EditUserComponent,
    ShoppingCartComponent,
    ModalComponent,
    SelectCityComponent,
    LayoutComponent,
    MakeShoppingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    [NgSelectModule, FormsModule],
    MatIconModule,
    BrowserAnimationsModule,
    MaterialModule,
    NgbModule
  ],
  providers: [ HelperService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
