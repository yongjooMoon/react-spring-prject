package com.msaProjectMenu01.menu.controller;

import java.io.IOException;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.msaProjectMenu01.menu.service.ProductService;

import jakarta.servlet.http.HttpServletRequest;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/menu")
public class ProductController {
		
	@Autowired
	private ProductService productService;
	
	@GetMapping("/products")
	public ResponseEntity<Map<String, Object>> getAllProducts() throws IOException {
		return productService.getAllProducts();
	}
	
	@PostMapping("/create")
	public void createProduct( HttpServletRequest request ) {
        try {
        	productService.createProduct(request);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
	
	@PostMapping("/update")
	public void productUpdate( HttpServletRequest request ) {
        try {
            // 이미지 파일 처리
        	productService.productUpdate(request);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
	
	@DeleteMapping("/delete")
	public void deleteProduct(@RequestParam(value = "productId", required=false) Integer productId) {
		productService.deleteProduct(productId);	
	}
}
