import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appNotSubmitted]'
})
export class NotSubmittedDirective {

  constructor(el:ElementRef) {
    el.nativeElement.style.color = '#DE1A1A';
    el.nativeElement.style.fontWeight = 'italic';
    el.nativeElement.style.backgroundColor = 'red';
    el.nativeElement.style.textDecoration = 'none';
  }

}
