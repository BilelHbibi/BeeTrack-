package com.example.backendbeetrack.controllers;

import com.example.backendbeetrack.entities.Commande;
import com.example.backendbeetrack.entities.Produit;
import com.example.backendbeetrack.entities.User;
import com.example.backendbeetrack.repositories.CommandeRepository;
import com.example.backendbeetrack.repositories.ProduitRepository;
import com.example.backendbeetrack.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/commandes")
@CrossOrigin(origins = "*")
public class CommandeController {

    @Autowired
    private CommandeRepository commandeRepository;

    @Autowired
    private ProduitRepository produitRepository;

    @Autowired
    private UserRepository userRepository;

    // CLIENT - passer une commande
    @PostMapping
    public ResponseEntity<?> passerCommande(@RequestBody Map<String, Object> body) {
        Long clientId = Long.valueOf(body.get("clientId").toString());
        Long produitId = Long.valueOf(body.get("produitId").toString());
        Integer quantite = Integer.valueOf(body.get("quantite").toString());

        User client = userRepository.findById(clientId)
                .orElseThrow(() -> new RuntimeException("Client non trouvé"));
        Produit produit = produitRepository.findById(produitId)
                .orElseThrow(() -> new RuntimeException("Produit non trouvé"));

        if (produit.getQuantiteDisponible() < quantite) {
            return ResponseEntity.badRequest().body(Map.of("error", "Stock insuffisant"));
        }

        Commande commande = Commande.builder()
                .client(client)
                .produit(produit)
                .quantite(quantite)
                .montantTotal(produit.getPrix() * quantite)
                .adresseLivraison(body.get("adresseLivraison") != null ? body.get("adresseLivraison").toString() : "")
                .telephone(body.get("telephone") != null ? body.get("telephone").toString() : "")
                .build();

        // Réduire le stock
        produit.setQuantiteDisponible(produit.getQuantiteDisponible() - quantite);
        produitRepository.save(produit);

        return ResponseEntity.ok(commandeRepository.save(commande));
    }

    // CLIENT - ses commandes
    @GetMapping("/client/{clientId}")
    public List<Commande> getCommandesClient(@PathVariable Long clientId) {
        return commandeRepository.findByClientId(clientId);
    }

    // APICULTEUR - toutes les commandes de ses produits
    @GetMapping("/apiculteur/{apiculteurId}")
    public List<Commande> getCommandesApiculteur(@PathVariable Long apiculteurId) {
        return commandeRepository.findByProduitApiculteurId(apiculteurId);
    }

    // APICULTEUR - nombre de commandes non lues (badge notification)
    @GetMapping("/apiculteur/{apiculteurId}/non-lues")
    public ResponseEntity<?> getNonLues(@PathVariable Long apiculteurId) {
        long count = commandeRepository.countByProduitApiculteurIdAndVueFalse(apiculteurId);
        return ResponseEntity.ok(Map.of("count", count));
    }

    // APICULTEUR - marquer toutes les commandes comme lues
    @PatchMapping("/apiculteur/{apiculteurId}/marquer-lues")
    public ResponseEntity<?> marquerLues(@PathVariable Long apiculteurId) {
        List<Commande> nonLues = commandeRepository.findByProduitApiculteurIdAndVueFalse(apiculteurId);
        nonLues.forEach(c -> c.setVue(true));
        commandeRepository.saveAll(nonLues);
        return ResponseEntity.ok(Map.of("message", "Commandes marquées comme lues"));
    }

    // APICULTEUR - changer le statut d'une commande
    @PatchMapping("/{id}/statut")
    public ResponseEntity<?> updateStatut(@PathVariable Long id, @RequestBody Map<String, String> body) {
        return commandeRepository.findById(id).map(commande -> {
            commande.setStatut(body.get("statut"));
            return ResponseEntity.ok(commandeRepository.save(commande));
        }).orElse(ResponseEntity.notFound().build());
    }
}
