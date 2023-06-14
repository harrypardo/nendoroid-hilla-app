package com.example.application.repository;


import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.application.model.Nendoroid;

import dev.hilla.Nonnull;



public interface NendoroidRepository extends JpaRepository<Nendoroid, Integer> {
        
        @Query(value="select distinct year from nendoroid", nativeQuery=true)
        List<Integer> findAllYears();


        @Query(value="select * from nendoroid where year = :year",
        nativeQuery=true)
        @Nonnull Page<@Nonnull Nendoroid> findAllByYear(@Param("year") int year, Pageable pageable);

         @Query(value="select count(*)  from nendoroid where year = :year", nativeQuery=true)
         Long CountByYear(@Param("year") int year);


         @Query(value="select count(*) from nendoroid", nativeQuery=true)
         Long CountAll();

         
        
}
