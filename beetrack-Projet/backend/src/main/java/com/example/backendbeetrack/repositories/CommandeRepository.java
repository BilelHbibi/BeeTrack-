package com.example.backendbeetrack.repositories;

import com.example.backendbeetrack.entities.Commande;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CommandeRepository extends JpaRepository<Commande, Long> {
    List<Commande> findByClientId(Long clientId);
    List<Commande> findByProduitApiculteurId(Long apiculteurId);
    List<Commande> findByProduitApiculteurIdAndVueFalse(Long apiculteurId);
    long countByProduitApiculteurIdAndVueFalse(Long apiculteurId);
}
