import { Component } from '@angular/core';
import emailjs from '@emailjs/browser';
import {CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {  RouterModule } from '@angular/router';

@Component({
  selector: 'app-become-seller',
  standalone: true,
  templateUrl: './become-seller.component.html',
  styleUrl: './become-seller.component.css',
  imports: [CommonModule , FormsModule, RouterModule]
})
export class BecomeSellerComponent {
  formData = {
    name: '',
    email: '',
    message: ''
  };

  sendEmail() {
    const serviceID = 'service_ndgfhml';
    const templateID = 'template_5bsv9n9';
    const publicKey = '7323LhQWgwJPJRI7c';

    const formattedData = {
      name: this.formData.name,
      email: this.formData.email,
      message: this.formData.message,
      time: new Date().toLocaleString('ar-EG', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    };

    emailjs.send(serviceID, templateID, formattedData, publicKey)
      .then(() => {
        alert('تم إرسال الطلب بنجاح!');
        this.formData = { name: '', email: '', message: '' }; // Reset form
      }, (err) => {
        alert('حدث خطأ أثناء إرسال الطلب:\n' + JSON.stringify(err));
      });
  }
}
