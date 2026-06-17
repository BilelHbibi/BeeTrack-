package com.example.backendbeetrack.entities;

import jakarta.persistence.*;
import lombok.*;
import lombok.Builder;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "commandes")
public class Commande {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "client_id", nullable = false)
    private User client;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "produit_id", nullable = false)
    private Produit produit;

    @Column(nullable = false)
    private Integer quantite;

    @Column(nullable = false)
    private String statut; // EN_ATTENTE, CONFIRMEE, LIVREE, ANNULEE

    @Column(nullable = false)
    private LocalDateTime dateCommande;

    private String adresseLivraison;
    private String telephone;
    private Double montantTotal;

    @Builder.Default
    @Column(nullable = false)
    private Boolean vue = false; // notification non lue par apiculteur

    @PrePersist
    public void prePersist() {
        this.dateCommande = LocalDateTime.now();
        this.statut = "EN_ATTENTE";
        this.vue = false;
    }
}
