package com.msaProjectMenu01.menu.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.msaProjectMenu01.menu.model.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer>{

}
