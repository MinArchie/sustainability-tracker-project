import { inject, Injectable } from '@angular/core';
import { Action } from '../model/actions.type'; 
import { HttpClient } from '@angular/common/http';

// making changes in main then switching to branch
@Injectable({
  providedIn: 'root'
})
export class ActionsService {
  http = inject(HttpClient)
  private apiUrl='http://localhost:3000/api/actions'

  // GET: Fetch actions from the API, returns an array of Action objects
  getActionsFromApi() {
    return this.http.get<Array<Action>>(this.apiUrl)
  }

  // POST: Add a new action to the API, excluding the id field (handled by the server)
  addActionToApi(actionData: Omit<Action, 'id'>) {
    return this.http.post<Action>(this.apiUrl, actionData)
  }
}
