import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Product} from "../../models/product";
import {map, Observable} from "rxjs";
import {CartService} from "../../services/cart.service";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  @Input()
  public product: Product | undefined = undefined;

  @Output()
  public addToCart: EventEmitter<Product> = new EventEmitter<Product>;

  constructor(private cartService: CartService) {
  }

  // #referenceToLabel
  public buttonLabel$: Observable<string> = new Observable<string>();

  public ngOnInit(): void {
    // button label is new stream from another stream in the service
    // for each product creates new stream with unique product id inside

    // important to do it exactly in the ngOnInit method
    // because if you will do it in the #referenceToLabel input parameter in not exists yet (undefined)
    // so you will create stream with undefined instead of real id inside, and it will not work
    this.buttonLabel$ = this.cartService.isInCart(this.product?.id)
      .pipe(
        map(
          (inCart: boolean): string => inCart
            ? 'In cart'
            : 'Add to cart'
        )
      );
  }
}
