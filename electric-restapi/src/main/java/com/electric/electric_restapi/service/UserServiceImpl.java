package com.electric.electric_restapi.service;

import com.electric.electric_restapi.model.EUser;
import com.electric.electric_restapi.model.LoginRequest;
import com.electric.electric_restapi.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;

    @Override
    public List<EUser> findAll() {
        return userRepository.findAll();
    }

    @Override
    public EUser findByEmail(String email) {
        return userRepository.findByEmail(email).orElse(null);
    }

    @Override
    public EUser create(EUser user) {
        if (user.getPassword().length() < 8) {
            throw new IllegalArgumentException("Lösenord måste vara minst 8 tecken.");
        }
        return userRepository.save(user);
    }
}
