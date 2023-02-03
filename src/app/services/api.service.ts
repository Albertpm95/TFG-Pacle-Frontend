import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.development';

import { Usuario } from '../models/usuario';

@Injectable({
	providedIn: 'root'
})
export class ApiService {

	title = environment.title;
	apiUrl = environment.apiURL

	constructor(private http: HttpClient) { }



	//Tests 
	startTests(): Observable<any> {
		let response;
		response = this.http.get<any>(this.apiUrl, { observe: 'response' })
		console.log('Response: ', response)
		response.subscribe(response => { console.log('Subscribe response ', response) })

		response = this.getPlural();
		response.subscribe(response => { console.log('Get 1', response) })

		response = this.get1('1');
		response.subscribe(response => { console.log('Get 1', response) })

		response = this.get2(2);
		response.subscribe(response => { console.log('Get 2', response) })

		response = this.post1('rick_sanchez');
		response.subscribe(response => { console.log('Post 1', response) })

		response = this.post2('jerry_smith', '1234');
		response.subscribe(response => { console.log('Post 2', response) })

		response = this.post3({ username: 'morty_smith', password: '1234' });
		response.subscribe(response => { console.log('Post 3', response) })

		return response;
	}

	getPlural(): Observable<any> {
		return this.http.get<any>(this.apiUrl + 'get_plural')
	}
	get1(acta_id: any): Observable<any> {
		return this.http.get<any>(this.apiUrl + 'get_1/' + acta_id)
	}
	get2(acta_id: number): Observable<any> {
		return this.http.get<any>(this.apiUrl + 'get_2/' + acta_id)
	}
	post1(username: String): Observable<any> {
		return this.http.post<any>(this.apiUrl + 'post_1/', username)
	}
	post2(username: String, password: String): Observable<any> {
		return this.http.post<any>(this.apiUrl + 'post_2/', { username, password })
	}
	post3(usuario: Usuario): Observable<any> {
		return this.http.post<any>(this.apiUrl + 'post_3/', { usuario })
	}
}
