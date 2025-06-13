package com.electric.electric_restapi.controller;


import com.electric.electric_restapi.model.Product;
import com.electric.electric_restapi.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    @GetMapping
    public List<Product> getAll(){
        return productService.getAllProduct();
    }

    @GetMapping("/{id}")
    public Product getById(@PathVariable long id){
        return productService.getById(id);
    }

    @PostMapping
    public Product create(@RequestBody Product product){
        return productService.create(product);
    }
}
