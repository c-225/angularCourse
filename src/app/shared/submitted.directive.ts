import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appSubmitted]'
})
export class SubmittedDirective {

  constructor(el:ElementRef) {
    el.nativeElement.style.color = 'green';
    el.nativeElement.style.fontWeight = 'bold';
    el.nativeElement.style.backgroundColor = 'lightgreen';
  }

}
