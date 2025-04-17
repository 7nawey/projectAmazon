import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {
  private apiUrl = 'https://localhost:7105/api/Chatbot/ask'; // Replace with your backend API URL

  constructor(private http: HttpClient) {}

  askChatbot(userMessage: string): Observable<any> {
    const payload = { message: userMessage };
    return this.http.post<any>(this.apiUrl, payload);
  }
}
