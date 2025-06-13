package com.electric.electric_restapi.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.List;

@Data
@Entity
@Table(name = "products")
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Category category;

    @Column(nullable = false)
    private Float price;

    @Column(length = 3, nullable = false)
    private String currency = "SEK";

    @Column(nullable = false)
    private Integer stock;

    private String image;

    private Integer reviews = 0;

    private String availability;

    @Column(columnDefinition = "TEXT")
    private String extraInfo;

    private String warranty;

    private String manufacturer;

    private String modelNumber;

    private LocalDate releaseDate;

    @ElementCollection
    private List<String> features;
}
