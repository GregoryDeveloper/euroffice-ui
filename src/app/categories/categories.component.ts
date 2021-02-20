import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Constants } from 'src/constants';
import { Category } from '../models/category';

@Component({
  selector: 'categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

	public categories: Category[] = []; 
	public selectedCategory: Category;
	public images: string[];

	client:HttpClient;

	httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json'
			})
		}
	
  constructor(client:HttpClient) {
		this.client = client;

	 }

  ngOnInit() {
		var url = `${Constants.server.URL}cat/limit/5/page/0`;
		this.client.get<any>(url,this.httpOptions)
											.subscribe(data => {
												this.categories = data;
											});
	}
	
	onChange(category) {

		this.selectedCategory = category;

    var url = `${Constants.server.URL}cat/limit/10/page/0/category/` + this.selectedCategory.id;
		return this.client.get<any>(url,this.httpOptions)
														.subscribe(data => {
															this.images = data;
														});
}

}
