import {Component, OnInit} from '@angular/core';
import {CartService} from "../services/cart.service";
import {map} from "rxjs";
import {Product} from "../models/product";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  price = 0;
  price$ = this.cartService.total$;

  constructor(private cartService: CartService) {

  }


  ngOnInit() {
    this.cartService.products$.subscribe(prod => {
      this.price = prod.reduce((sum, pr): number => sum + pr.price, 0)
    })
  }
}
