package com.example.productosapi.service;

import com.example.productosapi.entity.Product;
import com.example.productosapi.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    private final ProductRepository repo;

    public ProductService(ProductRepository repo) {
        this.repo = repo;
    }

    public List<Product> findAll() {
        return repo.findAll();
    }

    public Product findById(Long id) {
        return repo.findById(id).orElse(null);
    }

    public Product create(Product p) {
        p.setId(null);
        return repo.save(p);
    }

    public Product update(Long id, Product data) {
        Product existing = findById(id);
        if (existing == null) return null;
        existing.setName(data.getName());
        existing.setDescription(data.getDescription());
        existing.setPrice(data.getPrice());
        existing.setStock(data.getStock());
        return repo.save(existing);
    }

    public void delete(Long id) {
        repo.deleteById(id);
    }
}
