package com.example.demo.model;

import jakarta.persistence.Embeddable;

@Embeddable
public class ShipmentItem {
    private String commodity;
    private String weight;
    public String getCommodity() {
        return commodity;
    }
    public void setCommodity(String commodity) {
        this.commodity = commodity;
    }
    public String getWeight() {
        return weight;
    }
    public void setWeight(String weight) {
        this.weight = weight;
    }

    // Getters and Setters
    
}
