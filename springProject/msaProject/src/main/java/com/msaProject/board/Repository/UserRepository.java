package com.msaProject.board.Repository;


import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.msaProject.board.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

	Optional<User> findByIdAndPassword(String id, String password);
	
	Optional<User> findById(String id);
}