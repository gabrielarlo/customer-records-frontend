import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-summary-card',
  imports: [CommonModule],
  templateUrl: './summary-card.component.html',
  styleUrl: './summary-card.component.css'
})
export class SummaryCardComponent {
  public readonly title = input('new card');
  public readonly value = input(0, { transform: Number })
}
