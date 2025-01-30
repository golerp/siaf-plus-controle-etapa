import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FullscreenService {

  constructor() { }

  enableFullscreen(): void {
    const element = document.documentElement as HTMLElement | any;

    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen();
    }
  }

  exitFullscreen(): void {
    const documentObj = document as any;

    if (documentObj.exitFullscreen) {
      documentObj.exitFullscreen();
    } else if (documentObj.mozCancelFullScreen) {
      documentObj.mozCancelFullScreen();
    } else if (documentObj.webkitExitFullscreen) {
      documentObj.webkitExitFullscreen();
    } else if (documentObj.msExitFullscreen) {
      documentObj.msExitFullscreen();
    }
  }
}
