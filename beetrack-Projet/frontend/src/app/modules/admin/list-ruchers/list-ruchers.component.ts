import {ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import {RucherService} from "../../services/rucher.service";
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {MatSort, MatSortModule} from "@angular/material/sort";
import {debounceTime, map, merge, Observable, Subject, takeUntil} from "rxjs";
import {
    FormControl,
    ReactiveFormsModule,
    UntypedFormBuilder,
    UntypedFormControl,
    UntypedFormGroup,
    Validators
} from "@angular/forms";
import {FuseConfirmationService} from "../../../../@fuse/services/confirmation";
import {switchMap} from "rxjs/operators";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatSelectModule} from "@angular/material/select";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatDialog} from "@angular/material/dialog";
import {AjoutRucherDialogComponent} from "./ajout-rucher-dialog/ajout-rucher-dialog.component";
import {UpdateRucherDialogComponent} from "./update-rucher-dialog.component/update-rucher-dialog.component.component";

@Component({
  selector: 'app-list-ruchers',
  standalone: true,
    imports: [CommonModule, MatButtonModule, MatIconModule, MatInputModule, ReactiveFormsModule, MatPaginatorModule, MatSortModule, MatProgressBarModule, MatSlideToggleModule, MatSelectModule, MatCheckboxModule],
  templateUrl: './list-ruchers.component.html',
  styleUrls: ['./list-ruchers.component.scss']
})
export class ListRuchersComponent {
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    isLoading: boolean = false;
    searchInputControl: FormControl = new FormControl();
    ruchers$: any
    selectedRucher: any | null = null;
    selectedRucherForm: any; // Remplacez par un FormGroup réel dans votre implémentation
    flashMessage: 'success' | 'error' | null = null;

    // Pagination
    pagination = {
        length: 0,
        size: 10,
        page: 0,
    };

    // Pour les catégories/tags
    categoriesEditMode: boolean = false;
    filteredCategories: any[] = [];
    allCategories: any[] = [];

    constructor(
        private _rucherService: RucherService,
        private dialog: MatDialog
    ) { }

    ngOnInit(): void {
        // Simulez le chargement initial
this._rucherService.getAllRuchers().subscribe((result)=>{

    this.ruchers$=result;
    console.log(result);
})

        // Charge les ruchers

        // Gestion de la recherche
        this.searchInputControl.valueChanges
            .pipe(
                takeUntil(this._unsubscribeAll),
                debounceTime(300)
            )
            .subscribe(searchText => {
                // Implémentez la logique de filtrage côté serveur ou client ici
                console.log('Recherche:', searchText);
            });
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }
    openDialog(): void {
        const dialogRef = this.dialog.open(AjoutRucherDialogComponent, {
            width: '400px',
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                // Envoyer au backend
                this._rucherService.getAllRuchers().subscribe((result) => {
                    // Snackbar ou refresh liste
this.ruchers$ = result;                });
            }
        });
    }

    openDialogUpdate(rucher:any): void {
        const dialogRef = this.dialog.open(UpdateRucherDialogComponent, {
            width: '400px',
            data:rucher
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                // Envoyer au backend
                this._rucherService.getAllRuchers().subscribe((result) => {
                    // Snackbar ou refresh liste
                    this.ruchers$ = result;                });
            }
        });
    }
    openDialogDelete(id:any): void {
       this._rucherService.deleteRucher(id).subscribe((result) => {

           this._rucherService.getAllRuchers().subscribe((result) => {
               // Snackbar ou refresh liste
               this.ruchers$ = result;                });
       })
    }
    createRucher(): void {
        // Ouvrir un modal ou naviguer vers un formulaire d'ajout
        console.log('Ouvrir le formulaire pour créer un nouveau rucher');
    }

    toggleDetails(id: number): void {
        // Logique pour charger les détails du rucher
        console.log('Afficher/masquer les détails du rucher ID:', id);
        // this.selectedRucher = ...;
        // this.selectedRucherForm = this._formBuilder.group({...});
    }

    updateSelectedRucher(): void {
        // Logique pour mettre à jour le rucher sélectionné
        console.log('Mettre à jour le rucher:', this.selectedRucher);
        this.flashMessage = 'success';
        setTimeout(() => this.flashMessage = null, 3000);
    }

    deleteSelectedRucher(): void {
        if (confirm('Êtes-vous sûr de vouloir supprimer ce rucher ?')) {
            console.log('Supprimer le rucher:', this.selectedRucher?.id);
            this.flashMessage = 'success';
            setTimeout(() => this.flashMessage = null, 3000);
        }
    }

    // Fonctions utilitaires
    trackByFn(index: number, item: any): any {
        return item.id || index;
    }

}
