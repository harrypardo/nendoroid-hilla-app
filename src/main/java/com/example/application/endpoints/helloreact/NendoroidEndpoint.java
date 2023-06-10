package com.example.application.endpoints.helloreact;

import com.example.application.model.Nendoroid;
import com.example.application.repository.NendoroidRepository;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import dev.hilla.Endpoint;
import dev.hilla.Nonnull;
import java.util.List;



@Endpoint
@AnonymousAllowed
public class NendoroidEndpoint {

   
    
        private NendoroidRepository repository;
        public NendoroidEndpoint(NendoroidRepository repository) {
            this.repository = repository;
        }
   
        public @Nonnull List<@Nonnull Nendoroid> findAll() {
            return repository.findAll();
        }

}
