import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FashoinComponent } from '../fashoin/fashoin.component';

@Component({
  selector: 'app-electronic',
  imports: [RouterOutlet,CommonModule,FashoinComponent],
  templateUrl: './electronic.component.html',
  styleUrl: './electronic.component.css'
})
export class ElectronicComponent{
  
}
