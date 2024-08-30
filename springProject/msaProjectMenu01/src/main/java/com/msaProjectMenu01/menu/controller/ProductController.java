package com.msaProjectMenu01.menu.controller;

import java.io.IOException;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.msaProjectMenu01.menu.service.ProductService;

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
	public void createProduct(
            @RequestParam("productName") String productName,
            @RequestParam("productPrice") String productPrice,
            @RequestParam("imageFile") MultipartFile imageFile,
            @RequestParam("userId") String userId) {

        try {
            // 이미지 파일 처리
            if (imageFile != null && !imageFile.isEmpty()) {
                // 이미지 파일 저장 또는 처리
            	productService.createProduct(productName, productPrice, imageFile, userId);
            }else {
            	throw new Exception("이미지 미존재");
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
	
	@PostMapping("/update")
	public void productUpdate(
            @RequestParam("productName") String productName,
            @RequestParam("productPrice") String productPrice,
            @RequestParam(value ="imageFile", required=false) MultipartFile imageFile,
            @RequestParam("userId") String userId,
            @RequestParam("productId") Integer productId) {

        try {
            // 이미지 파일 처리
        	productService.productUpdate(productName, productPrice, imageFile, userId, productId);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
	
	@DeleteMapping("/delete")
	public void deleteProduct(@RequestParam(value = "productId", required=false) Integer productId) {
		productService.deleteProduct(productId);	
	}
}
