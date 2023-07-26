package com.example.application.endpoints.helloreact;

import com.example.application.model.Nendoroid;
import com.example.application.repository.NendoroidRepository;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import dev.hilla.Endpoint;
import dev.hilla.Nonnull;

import java.util.Collections;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.RequestParam;

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

    public @Nonnull Page<@Nonnull Nendoroid> findAllBypage(@RequestParam int page, @RequestParam int size) {
        Pageable pageable = PageRequest.of(page, size);
        return repository.findAll(pageable);

    }

    public @Nonnull List<Integer> findAllYears() {
        List<Integer> years = repository.findAllYears();
        Collections.sort(years, Collections.reverseOrder());
        return years;
    }

    public @Nonnull Page<@Nonnull Nendoroid> findAllByYear(@RequestParam int page, @RequestParam int size,
            @RequestParam String year) {
        Pageable pageable = PageRequest.of(page - 1, size);

        if (year.equals("all")) {
            return repository.findAll(pageable);
        } else {

            return repository.findAllByYear(Integer.parseInt(year), pageable);
        }
    }

    public @Nonnull Page<@Nonnull Nendoroid> findAllBy(@RequestParam int page, @RequestParam int size,
            @RequestParam String year, @RequestParam String name) {
        Pageable pageable = PageRequest.of(page - 1, size);

        if (year.equals("all") && name == null) {
            return repository.findAll(pageable);
        } else if (!year.equals("all") && name == null) {
            System.out.println("year:" + name);
            return repository.findAllByYear(Integer.parseInt(year), pageable);
        } else if (year.equals("all") && name != null) {
            return repository.findAllBySearch(name, pageable);
        } else {
            System.out.println(name);
            return repository.findAllBySearch(Integer.parseInt(year), name, pageable);
        }
    }

    public @Nonnull int getCount(@RequestParam String year, @RequestParam String name) {
        if (year.equals("all") && name == null) {
            Long count = repository.CountAll();
            return (int) (long) count;
        } else if (!year.equals("all") && name == null) {
            Long count = repository.CountByYear(Integer.parseInt(year));
            return (int) (long) count;
        } else if (year.equals("all") && name != null) {
            Long count = repository.CountBy(name);
            return (int) (long) count;
        } else {
            Long count = repository.CountBy(name, Integer.parseInt(year));
            return (int) (long) count;
        }
    }

}
