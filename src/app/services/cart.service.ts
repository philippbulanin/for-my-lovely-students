import { Injectable } from '@angular/core';
import {BehaviorSubject, map, Observable, of} from "rxjs";
import {Product} from "../models/product";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private _products$ = new BehaviorSubject<Product[]>([]);
  public products$ = this._products$.asObservable();

  // calculate total from the stream and return new stream with number inside
  public total$: Observable<number> = this.products$.pipe(
    map(
      (products: Product[]): number => products.reduce(
        (sum: number, product: Product): number => sum + product.price, 0)
    )
  );

  // gets a static value of current products list from subject
  get products(): Product[] {
    return this._products$.getValue();
  }

  // let us manage add process. In case it is already in the cart - remove it
  // else add the new one
  public manageAddProducts(product: Product): void {
    if (this.inCart(product.id)) {
      this.removeProduct(product.id);

      return;
    }

    this.addProduct(product);
  }

  // just add product inside the products stream created using subject
  public addProduct(product: Product): void {
    this._products$.next([product, ...this.products]);
  }

  // the same, but removing
  public removeProduct(id: string): void {
    const newProductsList: Product[] = this.products.filter((pr: Product): boolean => pr.id !== id);

    this._products$.next(newProductsList);
  }

  // using existing stream of products checking is another product
  // with id which we pass as parameter exists in this stream
  // and return another stream with boolean value
  public isInCart(id: string | undefined): Observable<boolean> {

    // just in case, if by so,e reason id is not defined just return stream with false
    if (!id) {
      // of operator needs here because function returns observable
      return of(false);
    }

    // creating and returning new stream mentioned before
    return this._products$
      .pipe(
        map(
          (products: Product[]): boolean => this.inCart(id, products)
        )
      )
  }

  // just check is product already in cart
  // products - optional parameter with default value from subject
  private inCart(id: string, products: Product[] = this.products) {
    return products
      .some(
        (product: Product): boolean => product.id === id
      )
  }
}
