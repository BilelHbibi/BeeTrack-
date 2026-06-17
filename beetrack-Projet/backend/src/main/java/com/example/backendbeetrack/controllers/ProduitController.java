package com.example.backendbeetrack.controllers;

import com.example.backendbeetrack.entities.Produit;
import com.example.backendbeetrack.entities.User;
import com.example.backendbeetrack.repositories.ProduitRepository;
import com.example.backendbeetrack.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/produits")
@CrossOrigin(origins = "*")
public class ProduitController {

    @Autowired
    private ProduitRepository produitRepository;

    @Autowired
    private UserRepository userRepository;

    // PUBLIC - tous les produits disponibles (pour CLIENT)
    @GetMapping
    public List<Produit> getAllProduits() {
        return produitRepository.findByQuantiteDisponibleGreaterThan(0);
    }

    // PUBLIC - un produit par id
    @GetMapping("/{id}")
    public ResponseEntity<?> getProduit(@PathVariable Long id) {
        return produitRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // APICULTEUR - ses propres produits
    @GetMapping("/apiculteur/{apiculteurId}")
    public List<Produit> getProduitsByApiculteur(@PathVariable Long apiculteurId) {
        return produitRepository.findByApiculteurId(apiculteurId);
    }

    // APICULTEUR - ajouter un produit
    @PostMapping
    public ResponseEntity<?> createProduit(@RequestBody Map<String, Object> body) {
        Long apiculteurId = Long.valueOf(body.get("apiculteurId").toString());
        User apiculteur = userRepository.findById(apiculteurId)
                .orElseThrow(() -> new RuntimeException("Apiculteur non trouvé"));

        Produit produit = Produit.builder()
                .nom(body.get("nom").toString())
                .description(body.get("description") != null ? body.get("description").toString() : "")
                .prix(Double.valueOf(body.get("prix").toString()))
                .quantiteDisponible(Integer.valueOf(body.get("quantiteDisponible").toString()))
                .type(body.get("type") != null ? body.get("type").toString() : "miel")
                .imageUrl(body.get("imageUrl") != null ? body.get("imageUrl").toString() : "")
                .apiculteur(apiculteur)
                .build();

        return ResponseEntity.ok(produitRepository.save(produit));
    }

    // APICULTEUR - modifier un produit
    @PutMapping("/{id}")
    public ResponseEntity<?> updateProduit(@PathVariable Long id, @RequestBody Map<String, Object> body) {
        return produitRepository.findById(id).map(produit -> {
            if (body.get("nom") != null) produit.setNom(body.get("nom").toString());
            if (body.get("description") != null) produit.setDescription(body.get("description").toString());
            if (body.get("prix") != null) produit.setPrix(Double.valueOf(body.get("prix").toString()));
            if (body.get("quantiteDisponible") != null) produit.setQuantiteDisponible(Integer.valueOf(body.get("quantiteDisponible").toString()));
            if (body.get("type") != null) produit.setType(body.get("type").toString());
            if (body.get("imageUrl") != null) produit.setImageUrl(body.get("imageUrl").toString());
            return ResponseEntity.ok(produitRepository.save(produit));
        }).orElse(ResponseEntity.notFound().build());
    }

    // APICULTEUR - supprimer un produit
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProduit(@PathVariable Long id) {
        if (!produitRepository.existsById(id)) return ResponseEntity.notFound().build();
        produitRepository.deleteById(id);
        return ResponseEntity.ok(Map.of("message", "Produit supprimé"));
    }
}
