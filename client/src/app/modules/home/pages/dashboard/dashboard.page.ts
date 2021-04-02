import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'ag-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  constructor() {}

  ngOnInit() {
    const leftEye = document.querySelector('.left-eye-color') as HTMLElement;
    const rightEye = document.querySelector('.right-eye-color') as HTMLElement;
    window.addEventListener('mousemove', function (event) {
      const x = (event.clientX / (window.innerWidth * 2)) * 100;
      const y = (event.clientY / (window.innerHeight * 2)) * 100;
      leftEye.style.left = `${x}%`;
      leftEye.style.top = `${y}%`;
      rightEye.style.left = `${x}%`;
      rightEye.style.top = `${y}%`;
    });
  }

  onMouseOver(mouth, leftEye, rightEye, body) {
    mouth.classList.add('hover');
    leftEye.style.transform = 'scale(1.15)';
    rightEye.style.transform = 'scale(1.15)';
    body.style.transform = 'scale(1.15)';
    body.style.cursor = 'none';
  }

  onMouseLeave(mouth, leftEye, rightEye, body) {
    mouth.classList.remove('hover');
    leftEye.style.transform = 'scale(1)';
    rightEye.style.transform = 'scale(1)';
    body.style.transform = 'scale(1)';
    body.style.cursor = 'default';
  }
}
