import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-modal-order',
  templateUrl: './modal-order.component.html',
  styleUrls: ['./modal-order.component.css']
})
export class ModalOrderComponent implements OnInit {

  @Input() public orderData:any = {};
  profile:any;
  user:any;

  constructor(private _auth: AuthService,public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    this.profile = this._auth.getCurrentUserProfile();
    this.user = this._auth.getCurrentUser();
  }

}
