import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/Product';
import { Warehouse } from 'src/app/models/Warehouse';
import { WarehouseService } from 'src/app/services/warehouse.service';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

interface City {
  name: string;
  code: string;
}

@Component({
  selector: 'app-homeproducts',
  templateUrl: './homeproducts.component.html',
  styleUrls: ['./homeproducts.component.css']
})



export class HomeproductsComponent implements OnInit{
   
  products : Product[] = []
  warehouses !: Warehouse[] 
  faSearch = faSearch
  text:string = ""
  wishListProducts : Product[] = []
  selectetWarehouse !: number
  layout: string = 'list';
  warehouse !: Warehouse

    constructor(private warehouseService : WarehouseService , private router : Router) {
      this.warehouseService.getAllWarehouses().subscribe((data) => {
        this.warehouses = data
      })
     }
  
    ngOnInit(): void {
      this.refreshProducts()
      this.refreshWarehouses()
    }

    refreshProducts(){
      this.warehouseService.getAllProducts().subscribe((data : any) => {
        this.products = data
      })
    };

    refreshWarehouses(){
      this.warehouseService.getAllWarehouses().subscribe((data) => {
        this.warehouses = data
      })
    }

    getProductsOfWarehouse(warehouseId : number){
      this.warehouseService.getWarehouseProducts(warehouseId).subscribe((data) => {
        this.products = data
      })
      this.selectetWarehouse = warehouseId

    }

    addToWishList(product : Product){
      this.wishListProducts.push(product)
      console.log(this.wishListProducts)
      console.log(this.selectetWarehouse)
    }

 


}
