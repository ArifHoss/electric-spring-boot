package com.electric.electric_restapi.exception;

public class NonUniqueResultException extends RuntimeException{
    public NonUniqueResultException(String message) {
        super(message);
    }
}
