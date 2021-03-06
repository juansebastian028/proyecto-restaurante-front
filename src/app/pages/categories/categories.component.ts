import { Component, OnInit, ViewChild } from '@angular/core';
import { Category } from 'src/app/interfaces/category';
import { SnackbarService } from 'src/app/services/snackbar/snackbar.service';
import { CategoryService } from '../../services/category/category.service';
import { TabsComponent } from 'src/app/components/tabs/tabs.component';
import { ModalDeleteComponent } from 'src/app/components/modal-delete/modal-delete.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  categoriesRows: Category[] = [];
  categoriesColumns = [
    { key: 'id', display: 'Categoria id' },
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
  @ViewChild('categoryEdit') categoryEditTemplate: any;
  @ViewChild(TabsComponent) tabsComponent: any;

  constructor(
    private _category: CategoryService,
    private _snackbar: SnackbarService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this._category.getCategories().subscribe(
      (data) => {
        this.categoriesRows = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onCategoryFormSubmit(form: any) {
    const { id, ...restForm } = form;
    if (form.id > 0) {
      this._category.putCategory(id, restForm).subscribe(
        (data) => {
          this.getCategories();
          this._snackbar.openSnackBar(
            'Categoría actualizada exitosamente',
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
      this._category.postCategory(restForm).subscribe(
        (data) => {
          this.getCategories();
          this._snackbar.openSnackBar(
            'Categoría registrada exitosamente',
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
    let category: Category = obj.element;
    if (obj.action === 'edit') {
      this.tabsComponent.openTab(
        `Editar ${category.name}`,
        this.categoryEditTemplate,
        category,
        true
      );
    } else {
      const modalRef = this.modalService.open(ModalDeleteComponent);
      modalRef.componentInstance.data = category;
      modalRef.componentInstance.modalRef = modalRef;

      modalRef.componentInstance.eventEmitter.subscribe(
        (isDeleted: boolean) => {
          if (isDeleted) {
            this._category.deleteCategory(category.id).subscribe(
              (data) => {
                this.getCategories();
                this._snackbar.openSnackBar(
                  'Categoría eliminada exitosamente',
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

  onAddCategory() {
    this.tabsComponent.openTab(
      'Nueva Categoría',
      this.categoryEditTemplate,
      {},
      true
    );
  }
}
