
package com.example.demo.service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.OrderDetails;

import com.example.demo.repository.OrderDetailsRepository;


import java.util.List;
import java.util.Optional;

@Service
public class OrderDetailsService {

    @Autowired
    private OrderDetailsRepository orderDetailsRepository;
  
    public OrderDetails createOrder(OrderDetails orderDetails) {
        return orderDetailsRepository.save(orderDetails);
    }

  

    public List<OrderDetails> getAllOrders() {
        return orderDetailsRepository.findAll();
    }

    public Optional<OrderDetails> getOrderById(Long id) {
        return orderDetailsRepository.findById(id);
    }

    
    public OrderDetails updateOrder(Long id, OrderDetails orderDetails) {
        if (!orderDetailsRepository.existsById(id)) {
            throw new RuntimeException("Order not found");
        }
        orderDetails.setId(id);
        return orderDetailsRepository.save(orderDetails);
    }

    public void deleteOrder(Long id) {
        if (!orderDetailsRepository.existsById(id)) {
            throw new RuntimeException("Order not found");
        }
        orderDetailsRepository.deleteById(id);
    }

    // public List<OrderDetails> getOrdersByUserEmail(String email) {
    //     return orderDetailsRepository.findBySenderEmail(email);
    // }
   
   
}
