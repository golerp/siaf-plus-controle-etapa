import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { BiometriaService } from '../../../service/biometria.service';
import * as faceapi from '@vladmandic/face-api';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login-facial',
  templateUrl: './login-facial.component.html',
  styleUrls: ['./login-facial.component.scss'],
})
export class LoginFacialComponent implements OnInit {
  private trigger: Subject<void> = new Subject<void>();
  private isProcessing = false;
  public isRegisterMode = false;

  // Referência ao componente webcam
  @ViewChild('webcam') webcam: any;

  constructor(private biometriaService: BiometriaService,
    private messageService: MessageService
  ) {}

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  async ngOnInit(): Promise<void> {
    await this.loadModels();
    this.startFacialRecognition();
  }

  // Carrega os modelos necessários do face-api.js
  private async loadModels(): Promise<void> {
    const modelPath = '/assets/models'; // Caminho para os modelos
    await faceapi.loadTinyFaceDetectorModel(modelPath);
    await faceapi.loadFaceLandmarkModel(modelPath);
    console.log('Modelos carregados com sucesso!');
  }

  // Inicia o reconhecimento facial
  private startFacialRecognition(): void {
    this.startVideoFeed();
  }

  // Inicia o feed de vídeo da webcam
  private startVideoFeed(): void {
    const videoElement = document.createElement('video');
    videoElement.width = 640;
    videoElement.height = 480;

    // Acessa a webcam e transmite para o vídeo
    navigator.mediaDevices
      .getUserMedia({ video: {} })
      .then((stream) => {
        videoElement.srcObject = stream;
        videoElement.play();
        this.detectFacesContinuously(videoElement); // Inicia a detecção de rostos
      })
      .catch((err) => {
        console.error('Erro ao acessar a câmera:', err);
      });
  }

  // Realiza a detecção contínua de rostos
  private detectFacesContinuously(videoElement: HTMLVideoElement): void {
    setInterval(async () => {
      if (!this.isProcessing) {
        this.isProcessing = true;
        
        const detections = await faceapi.detectAllFaces(
          videoElement,
          new faceapi.TinyFaceDetectorOptions()
        );

        if (detections.length > 0) {
          this.messageService.add({ severity: 'info', summary: 'Informação', detail: 'Rosto detectado!' })
          // Se houver um rosto, você pode proceder com o login ou cadastro
          const base64Image = this.captureImage(videoElement);
          const file = this.base64ToFile(base64Image, 'facial_image.jpg');
          
          if (this.isRegisterMode) {
            await this.registerFacial(file);
          } else {
            await this.loginFacial(file);
          }
        } else {
          this.messageService.add({ severity: 'warn', summary: 'Aviso', detail: 'Nenhum Rosto detectado!' })
        }

        this.isProcessing = false;
      }
    }, 5000); 
  }

  // Converte base64 para File
  private base64ToFile(base64Image: string, filename: string): File {
    const arr = base64Image.split(',');
    const match = arr[0].match(/:(.*?);/);
    const mime = match ? match[1] : '';
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }

  // Registra a biometria facial
  private async registerFacial(file: File): Promise<void> {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('user_id', '1');
  
    try {
      const response = await this.biometriaService.cadastroFacial(formData);
      console.log('Cadastro realizado com sucesso:', response);
    } catch (error) {
      console.error('Erro ao cadastrar facial:', error);
    }
  }
  
  // Realiza o login com biometria facial
  private async loginFacial(file: File): Promise<void> {
    const formData = new FormData();
    formData.append('image', file);
  
    try {
      const response = await this.biometriaService.loginFacial(formData);
      if (response.message.includes('falhou')) {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: response.message });
      } else {
        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: response.message });
      }
    } catch (error: any) {
      this.messageService.add({ severity: 'error', summary: 'Erro', detail: error.message });
    }
  }
  // Captura a imagem base64 do vídeo
  private captureImage(videoElement: HTMLVideoElement): string {
    const canvas = document.createElement('canvas');
    canvas.width = videoElement.width;
    canvas.height = videoElement.height;
    const ctx = canvas.getContext('2d');
    ctx?.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL();
  }
}
