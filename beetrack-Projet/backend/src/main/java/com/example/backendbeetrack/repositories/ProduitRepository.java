package com.example.backendbeetrack.repositories;

import com.example.backendbeetrack.entities.Produit;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ProduitRepository extends JpaRepository<Produit, Long> {
    List<Produit> findByApiculteurId(Long apiculteurId);
    List<Produit> findByQuantiteDisponibleGreaterThan(Integer quantite);
}
