import { inject, Injectable } from '@angular/core';
import { Action } from '../model/actions.type'; 
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ActionsService {
  http = inject(HttpClient)
  private apiUrl='http://localhost:3000/api/actions'

  getActionsFromApi() {
    return this.http.get<Array<Action>>(this.apiUrl)
  }

  addActionToApi(actionData: Omit<Action, 'id'>) {
    return this.http.post<Action>(this.apiUrl, actionData)
  }
}
