import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Product} from "../models/product";
import {ProductsService} from "../services/products.service";
import {CartService} from "../services/cart.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  public products$ = new Observable<Product[]>();

  constructor(
    private productsService: ProductsService,
    private cartService: CartService
  ) {

  }

  ngOnInit() {
    this.products$ = this.productsService.getProducts();
  }

  public addToCart(product: Product): void {
    this.cartService.manageAddProducts(product);
  }
}
