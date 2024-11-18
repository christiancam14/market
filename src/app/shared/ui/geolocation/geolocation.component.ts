import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import * as L from 'leaflet'; // Importar Leaflet

@Component({
  selector: 'app-geolocation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './geolocation.component.html',
  styleUrls: ['./geolocation.component.css'],
})
export class GeolocationComponent implements AfterViewInit {
  latitude: number | null = null;
  longitude: number | null = null;
  address: string | null = null;
  isLoading: boolean = false;
  errorMessage: string | null = null;

  @ViewChild('map', { static: false }) mapContainer!: ElementRef;

  constructor(private http: HttpClient) {}

  ngAfterViewInit(): void {
    // Aseguramos que el mapContainer está disponible después de la inicialización de la vista
    if (this.latitude && this.longitude) {
      this.initMap();
    }
  }

  getLocation() {
    this.isLoading = true;
    this.errorMessage = null;

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;
          this.getAddress(this.latitude, this.longitude);
          this.isLoading = false;
          this.initMap(); // Inicializar el mapa después de obtener la ubicación
        },
        (error) => {
          this.errorMessage = 'No se pudo obtener la ubicación.';
          this.isLoading = false;
        }
      );
    } else {
      this.errorMessage =
        'La API de Geolocalización no es soportada por este navegador.';
      this.isLoading = false;
    }
  }

  getAddress(latitude: number, longitude: number) {
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;

    this.http.get(url).subscribe(
      (response: any) => {
        if (response && response.address) {
          this.address = response.address.road || 'Dirección desconocida';
        } else {
          this.errorMessage = 'No se pudo obtener la dirección.';
        }
      },
      (error) => {
        this.errorMessage = 'Ocurrió un error al obtener la dirección.';
      }
    );
  }

  // Inicializa el mapa de Leaflet
  initMap() {
    if (this.latitude && this.longitude) {
      // Aseguramos que mapContainer esté disponible
      if (this.mapContainer) {
        const map = L.map(this.mapContainer.nativeElement).setView(
          [this.latitude, this.longitude],
          13
        );

        // Cargar OpenStreetMap como capa base
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map);

        // Agregar un marcador en la ubicación actual
        L.marker([this.latitude, this.longitude])
          .addTo(map)
          .bindPopup('Tu ubicación')
          .openPopup();
      }
    }
  }
}
