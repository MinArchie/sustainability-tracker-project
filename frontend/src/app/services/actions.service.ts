import { inject, Injectable } from '@angular/core';
import { Action } from '../model/actions.type'; 
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ActionsService {
  http = inject(HttpClient)
  // ensure api is also running in the background
  private apiUrl='http://localhost:3000/api/actions'


  // GET: fetch data from api, returns Action[]
  getActionsFromApi() {
    return this.http.get<Array<Action>>(this.apiUrl)
  }

  // POST: Post an action item (excluding id which is calculated automatically) to api
  addActionToApi(actionData: Omit<Action, 'id'>) {
    return this.http.post<Action>(this.apiUrl, actionData)
  }
}
