package com.example.application.repository;
import org.springframework.data.jpa.repository.JpaRepository;

import com.example.application.model.Nendoroid;



public interface NendoroidRepository extends JpaRepository<Nendoroid, Integer> {
        
}
