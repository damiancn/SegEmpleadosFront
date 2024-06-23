import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';

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

  toggleDrawer() {
    this.drawer.toggle();
    this.drawerOpened = !this.drawerOpened;
  }

  constructor() { }
  subscription = new Subscription;

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  cerrarSesion() {
    this.subscription.unsubscribe();
  }


}
