import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "../models/product";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  getProducts(limit: number = 10, page: number = 1): Observable<Product[]> {
    return this.http.get<Product[]>('https://hys-fe-course-api.vercel.app/products', {
      params: {
        limit,
        page
      }
    });
  }
}
