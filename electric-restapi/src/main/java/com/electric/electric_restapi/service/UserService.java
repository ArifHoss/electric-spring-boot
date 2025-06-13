package com.electric.electric_restapi.service;

import com.electric.electric_restapi.model.EUser;

import java.util.List;

public interface UserService {

    List<EUser> findAll();
    EUser findByEmail(String email);
    EUser create(EUser user);
}
