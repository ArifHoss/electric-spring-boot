package com.electric.electric_restapi.controller;

import com.electric.electric_restapi.model.EUser;
import com.electric.electric_restapi.model.LoginRequest;
import com.electric.electric_restapi.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping
    public List<EUser> getUser() {
        return userService.findAll();
    }

    // UserController.java

    @GetMapping("/email/{email}")
    public ResponseEntity<EUser> getUserByEmail(@PathVariable String email) {
        EUser user = userService.findByEmail(email);
        if (user == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(user);
    }

    @PostMapping
    public EUser createUser(@RequestBody EUser user){
        return userService.create(user);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        EUser user = userService.findByEmail(request.getEmail());

        if (user == null || !user.getPassword().equals(request.getPassword())) {
            return ResponseEntity.status(401).body("{\"error\":\"Fel e-post eller lösenord.\"}");
        }

        return ResponseEntity.ok(user); // return full user object
    }

}
