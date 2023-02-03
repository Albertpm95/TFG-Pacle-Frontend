import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';
import { environment } from 'src/environments/environment.development';
@Injectable({
	providedIn: 'root'
})
export class AuthService {
	title = environment.title;
	apiUrl = environment.apiURL

	constructor(private http: HttpClient) { }

	login(user: Usuario): Observable<any> {
		return this.http.post<any>(this.apiUrl + 'login', user)
	}
}
