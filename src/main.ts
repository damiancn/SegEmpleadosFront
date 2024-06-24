import { bootstrapApplication } from "@angular/platform-browser";
import { AppComponent } from "./app/app.component";
import { routes } from "./app/app-routing.module";
import { provideRouter } from "@angular/router";
import { provideHttpClient, withFetch, withInterceptors } from "@angular/common/http";
import { authInterceptor } from "./app/core/interceptor/Interceptor.service";
import { provideAnimations } from "@angular/platform-browser/animations";
import { MAT_DATE_LOCALE } from "@angular/material/core";


bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(withFetch(),
    withInterceptors([authInterceptor]),
    
    
  ),
  { provide: MAT_DATE_LOCALE, useValue: 'es-MX' },
    provideAnimations(),
],
}
).
  catch(err => console.error(err));