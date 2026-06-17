// src/app/modules/admin/dashboard/dashboard.component.ts
import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { CurrencyPipe, DatePipe, DecimalPipe, NgClass, NgForOf, NgIf } from "@angular/common";
import { FinanceService } from "../../services/Finance.service";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

Chart.register(...registerables);

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    standalone: true,
    imports: [
        DecimalPipe,
        CurrencyPipe,
        DatePipe,
        NgForOf,
        NgIf,
        NgClass
    ],
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
    @ViewChild('productionChart') productionChartRef!: ElementRef<HTMLCanvasElement>;
    @ViewChild('etatChart') etatChartRef!: ElementRef<HTMLCanvasElement>; // âœ… AjoutÃ©
    getTachesStatut(): Observable<any> {
        return this.http.get<any>('http://localhost:8085/taches/statut');
    }tachesStatut: any = { accomplies: 0, enCours: 0, total: 0 };
    tachesEnCours: any[] = [];
    private tacheChart: Chart | null = null;

    @ViewChild('tacheChart') tacheChartRef!: ElementRef<HTMLCanvasElement>;

    getTachesEnCours(): Observable<any[]> {
        return this.http.get<any[]>('http://localhost:8085/taches/en-cours');
    }
    ruchersActifs: number = 0;
    totalRuches: number = 0;
    totalRecoltes: number = 0;
    etatData: any = { totalRuches: 0, repartition: [] };
    beneficeNet: number = 0;

    private chart: Chart | null = null;
    private etatChart: Chart | null = null; // âœ… AjoutÃ©

    constructor(
        private dashboardService: FinanceService,
        private http: HttpClient,
    ) {}

    getEtatRuches(): Observable<any> {
        return this.http.get<any>('http://localhost:8085/api/dashboard/etat-ruches');
    }

    anneeCourante: number = new Date().getFullYear();

    ngOnInit(): void {
        this.loadDashboardData();
        this.getEtatRuches().subscribe(data => {
            this.etatData = data;
            this.renderEtatChart(); // âœ… Appel du graphique
        });
        this.getTachesStatut().subscribe(data => {
            this.tachesStatut = data;
            this.renderTacheChart(); // â† appel aprÃ¨s chargement

        })
        this.getTachesEnCours().subscribe(data => {
            this.tachesEnCours = data;
        })

    }

    ngOnDestroy(): void {
        if (this.chart) this.chart.destroy();
        if (this.etatChart) this.etatChart.destroy(); // âœ… Nettoyage
    }

    loadDashboardData(): void {
        this.dashboardService.getDashboard().subscribe({
            next: (data: any) => {
                this.ruchersActifs = data.ruchersActifs;
                this.totalRuches = data.totalRuches;
                this.totalRecoltes = data.totalRecoltes;
                this.beneficeNet = data.beneficeNet;
                this.renderChart(data.productionMensuelle);
            },
            error: (error: any) => {
                console.error('Erreur dashboard :', error);
                alert('Impossible de charger les donnÃ©es.');
            }
        });
    }

    renderChart(productionMensuelle: any[]): void {
        const canvas = this.productionChartRef.nativeElement;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        if (this.chart) this.chart.destroy();

        const labels = [
            'Jan', 'FÃ©v', 'Mar', 'Avr', 'Mai', 'Juin',
            'Juil', 'AoÃ»t', 'Sept', 'Oct', 'Nov', 'DÃ©c'
        ];

        const quantites = productionMensuelle
            .sort((a, b) => a.mois - b.mois)
            .map((item: any) => item.quantiteTotale ?? 0);

        this.chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Production de miel (kg)',
                    data: quantites,
                    backgroundColor: 'rgba(54, 162, 235, 0.6)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: true, position: 'top' }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: { display: true, text: 'QuantitÃ© (kg)' }
                    },
                    x: {
                        title: { display: true, text: 'Mois' }
                    }
                }
            }
        });
    }

    // âœ… NOUVELLE MÃ‰THODE : Graphique Ã©tat des ruches
    renderEtatChart(): void {
        console.log('DonnÃ©es reÃ§ues pour le graphique :', this.etatData.repartition);

        const ctx = this.etatChartRef.nativeElement.getContext('2d');
        if (!ctx || !this.etatData.repartition || this.etatData.repartition.length === 0) return;

        if (this.etatChart) this.etatChart.destroy();

        const labels = this.etatData.repartition.map((item: any) => item.libelle);
        const data = this.etatData.repartition.map((item: any) => item.nombre);
        const backgroundColors = this.etatData.repartition.map((item: any) => {
            if (item.etat === 'active') return 'rgba(34, 197, 94, 0.85)';    // vert
            if (item.etat === 'malade') return 'rgba(239, 68, 68, 0.85)';   // rouge
            return 'rgba(234, 179, 8, 0.85)';                              // jaune
        });

        this.etatChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: labels,
                datasets: [{
                    data: data,
                    backgroundColor: backgroundColors,
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 16,
                            usePointStyle: true,
                            font: { size: 12 }
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: (context) => {
                                const value = context.raw as number;
                                const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
                                const pct = total > 0 ? ((value / total) * 100).toFixed(1) : '0.0';
                                return `${context.label}: ${value} ruche(s) (${pct}%)`;
                            }
                        }
                    }
                },
                cutout: '70%'
            }
        });
    }


    renderTacheChart(): void {
        const ctx = this.tacheChartRef.nativeElement.getContext('2d');
        if (!ctx) return;
        if (this.tacheChart) this.tacheChart.destroy();

        // âœ… CORRECTION : structure Chart.js VALIDE
        this.tacheChart = new Chart(ctx, {
            type: 'doughnut',
            data: { // â† "data" au mÃªme niveau que "type"
                labels: ['Accomplies', 'En cours'],
                datasets: [{
                    data: [this.tachesStatut.accomplies, this.tachesStatut.enCours], // â† "data:" obligatoire
                    backgroundColor: [
                        'rgba(34, 197, 94, 0.85)',
                        'rgba(59, 130, 246, 0.85)'
                    ],
                    borderWidth: 0
                }]
            },
            options: { // â† "options" au mÃªme niveau que "type" et "data"
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'bottom' }
                },
                cutout: '70%'
            }
        });
    }

}

