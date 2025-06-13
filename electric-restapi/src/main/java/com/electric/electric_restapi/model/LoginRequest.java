package com.electric.electric_restapi.model;

import lombok.Data;

@Data
public class LoginRequest {
    private String email;
    private String password;

}
