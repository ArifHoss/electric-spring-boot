package com.electric.electric_restapi.repository;

import com.electric.electric_restapi.model.EUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<EUser, Long> {
    Optional<EUser> findByEmail(String email);
}
