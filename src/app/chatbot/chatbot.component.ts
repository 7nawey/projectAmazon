import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatbotService } from '../chatbot.service';

@Component({
  selector: 'app-chatbot',
  imports:[CommonModule,FormsModule],
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent {
  userMessage: string = '';
  chatHistory: { type: string; text: string }[] = [];

  constructor(private chatbotService: ChatbotService) {}

  sendMessage() {
    if (this.userMessage.trim()) {
      // Add user's message to chat history
      this.chatHistory.push({ type: 'user', text: this.userMessage });

      // Call the chatbot service to fetch the response
      this.chatbotService.askChatbot(this.userMessage).subscribe(
        (response) => {
          // Add chatbot's response to chat history
          this.chatHistory.push({ type: 'bot', text: response.response });
        },
        (error) => {
          // Handle error by displaying an appropriate message
          console.error('Error:', error);
          this.chatHistory.push({ type: 'bot', text: 'Unable to fetch response. Please try again later.' });
        }
      );

      // Clear the input field
      this.userMessage = '';
    }
  }
}

