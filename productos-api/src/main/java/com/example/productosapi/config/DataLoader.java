package com.example.productosapi.config;

import com.example.productosapi.entity.Product;
import com.example.productosapi.repository.ProductRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataLoader {

    @Bean
    CommandLineRunner init(ProductRepository repo) {
        return args -> {
            if (repo.count() == 0) {
                repo.save(Product.builder().name("Camiseta").description("Algodón").price(45000.0).stock(10).build());
                repo.save(Product.builder().name("Pantalón").description("Deportivo").price(85000.0).stock(5).build());
            }
        };
    }
}
