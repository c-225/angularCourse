import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appNotSubmitted]'
})
export class NotSubmittedDirective {

  constructor(el:ElementRef) {
    el.nativeElement.style.color = 'red';
    el.nativeElement.style.fontWeight = 'italic';
    el.nativeElement.style.backgroundColor = 'pink';
  }

}
