package com.electric.electric_restapi.repository;

import com.electric.electric_restapi.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    Product getProductById(Long id);
}
