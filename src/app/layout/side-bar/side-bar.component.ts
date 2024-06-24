import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from 'src/app/core/services/authservice.service';
import { Page } from 'src/app/model/security/page';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
  standalone: true,
  imports: [ 
    CommonModule,
    RouterModule,
    MatIconModule,
    MatTooltipModule,
    MatSidenavModule,
  ],
})
export class SideBarComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('drawer') drawer: MatDrawer;
  drawerOpened = false;

  pages: Page[];
  cantidadPage: boolean[] = [];


  toggleDrawer() {
    this.drawer.toggle();
    this.drawerOpened = !this.drawerOpened;
  }

  constructor(
    private route: Router ,
    private authService: AuthService,
  ) { 
    const credencial = authService.obtenerCredencial();

    // this.nombreUsuario = this.authS.obtenerCredencial().nombreUsuario;
    this.pages = authService.obtenerCredencial().pages;
    this.pages.forEach(element => {
      this.cantidadPage.push(false);
    });
  }
  ngOnInit(): void {
  }

  irA(obj: any) {
    this.route.navigate(['pages/' + obj]);
  }

  ngAfterViewInit(): void {
  }

  ngOnDestroy(): void {
  }

  cerrarSesion() {
    this.authService.salir();
  }


}
