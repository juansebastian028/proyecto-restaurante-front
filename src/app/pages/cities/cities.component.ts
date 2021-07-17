import { Component, OnInit, ViewChild } from '@angular/core';
import { City } from 'src/app/interfaces/city';
import { CityService } from 'src/app/services/city/city.service';
import { SnackbarService } from 'src/app/services/snackbar/snackbar.service';
import { TabsComponent } from 'src/app/components/tabs/tabs.component';
import { ModalDeleteComponent } from 'src/app/components/modal-delete/modal-delete.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.css'],
})
export class CitiesComponent implements OnInit {
  citiesRows: City[] = [];
  citiesColumns = [
    { key: 'id', display: 'Ciudad id' },
    { key: 'name', display: 'Nombre' },
    {
      key: 'actions',
      display: 'Acciones',
      config: {
        isAction: true,
        actions: [
          { class: ['btn', 'btn-danger'], icon: 'delete', name: 'delete' },
          { class: ['btn', 'btn-warning'], icon: 'edit', name: 'edit' },
        ],
      },
    },
  ];
  @ViewChild('cityEdit') editCityTemplate: any;
  @ViewChild(TabsComponent) tabsComponent: any;

  constructor(
    private _city: CityService,
    private _snackbar: SnackbarService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.getCities();
  }

  getCities() {
    this._city.getCities().subscribe(
      (data) => {
        this.citiesRows = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onCityFormSubmit(form: any) {
    const { id, ...restForm } = form;

    if (form.id > 0) {
      this._city.putCity(id, restForm).subscribe(
        (data: any) => {
          this.getCities();
          this._snackbar.openSnackBar(
            'Ciudad actualizada exitosamente',
            'bg-success',
            'text-white'
          );
          this.tabsComponent.closeActiveTab();
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      this._city.postCity(restForm).subscribe(
        (data: any) => {
          this.getCities();
          this._snackbar.openSnackBar(
            'Ciudad registrada exitosamente',
            'bg-success',
            'text-white'
          );
          this.tabsComponent.closeActiveTab();
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  executeAction(obj: any) {
    let city: City = obj.element;
    if (obj.action === 'edit') {
      this.tabsComponent.openTab(
        `Editar ${city.name}`,
        this.editCityTemplate,
        city,
        true
      );
    } else {
      const modalRef = this.modalService.open(ModalDeleteComponent);
      modalRef.componentInstance.data = city;
      modalRef.componentInstance.modalRef = modalRef;

      modalRef.componentInstance.eventEmitter.subscribe(
        (isDeleted: boolean) => {
          if (isDeleted) {
            this._city.deleteCity(city.id).subscribe(
              (data: any) => {
                if (
                  city.id === JSON.parse(localStorage.getItem('selected_city')!)
                ) {
                  localStorage.removeItem('selected_city');
                }
                this.getCities();
                this._snackbar.openSnackBar(
                  'Ciudad eliminada exitosamente',
                  'bg-success',
                  'text-white'
                );
              },
              (error) => {
                console.log(error);
              }
            );
          }
        },
        (error: any) => {
          console.log(error);
        }
      );
    }
  }

  onAddCity() {
    this.tabsComponent.openTab('Nueva Ciudad', this.editCityTemplate, {}, true);
  }
}
