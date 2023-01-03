import { Component } from '@angular/core';
import {Product} from "../models/product";
import {CartService} from "../services/cart.service";
import {map, Observable, tap} from "rxjs";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  constructor(public cartService: CartService) {
  }

  removeFromCart(id: string | undefined): void {
    this.cartService.removeProduct(id as string);
  }
}
