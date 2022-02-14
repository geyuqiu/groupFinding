import { Component, Input, OnInit } from '@angular/core';
import { GreetingService } from '../../services/greeting.service';
import { Greeting } from '../../models/greeting.model';

@Component({
  selector: 'app-greeting',
  templateUrl: './greeting.component.html',
  styleUrls: ['./greeting.component.sass']
})
export class GreetingComponent implements OnInit {

  @Input()
  greeting: Greeting = {
    content: 'Hello, Peter!'
  } as Greeting;

  constructor(private readonly greetingService: GreetingService) {}

  ngOnInit(): void {
    this.greetingService.fetch().subscribe(greeting => {
      this.greeting = greeting
    });
  }
}
