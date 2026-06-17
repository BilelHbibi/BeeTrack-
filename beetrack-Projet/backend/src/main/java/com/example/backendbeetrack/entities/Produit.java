package com.example.backendbeetrack.entities;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "produits")
public class Produit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nom;

    @Column(length = 1000)
    private String description;

    @Column(nullable = false)
    private Double prix;

    @Column(nullable = false)
    private Integer quantiteDisponible;

    private String type; // miel_fleurs, miel_thym, cire, propolis, etc.

    private String imageUrl;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "apiculteur_id")
    private User apiculteur;

    @Column(nullable = false)
    private LocalDateTime dateAjout;

    @PrePersist
    public void prePersist() {
        this.dateAjout = LocalDateTime.now();
    }
}
