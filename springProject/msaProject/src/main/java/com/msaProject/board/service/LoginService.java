package com.msaProject.board.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.msaProject.board.Repository.UserRepository;
import com.msaProject.board.model.User;

@Service
public class LoginService {

	@Autowired
	private UserRepository userRepository;

	
	public Optional<User> loginUser(String id, String password) {		
		return userRepository.findByIdAndPassword(id, password);
	}
	
	public User createId(User user){
		return userRepository.save(user);
	}
}