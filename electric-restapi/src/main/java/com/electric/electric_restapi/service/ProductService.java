package com.electric.electric_restapi.service;

import com.electric.electric_restapi.model.Product;

import java.util.List;

public interface ProductService {
    List<Product> getAllProduct();
    Product create(Product product);

    Product getById(long id);
}
