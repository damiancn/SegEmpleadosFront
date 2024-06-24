import { MatDialogConfig } from "@angular/material/dialog";

export function getMatDialogConfig(maxWidth: string, maxHeight: string,): MatDialogConfig {
    return {
        disableClose: true,
        width: '95vw',
        maxWidth: maxWidth,
        maxHeight: maxHeight,
        height: '95vh',
        panelClass: 'modalAngular',
    }
}	