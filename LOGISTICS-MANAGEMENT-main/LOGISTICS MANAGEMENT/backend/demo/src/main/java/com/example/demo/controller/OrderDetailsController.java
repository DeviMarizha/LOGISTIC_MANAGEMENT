
package com.example.demo.controller;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.*;

import com.example.demo.model.OrderDetails;

import com.example.demo.service.OrderDetailsService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class OrderDetailsController {

    @Autowired
    private OrderDetailsService orderDetailsService;



    @CrossOrigin(origins ="http://localhost:3000")
    @PostMapping("/orders")
    public OrderDetails createOrder(@RequestBody OrderDetails orderDetails) {
        return orderDetailsService.createOrder(orderDetails);
    } 
   
   

    @CrossOrigin(origins ="http://localhost:3000")
    @GetMapping("/orders")
    public List<OrderDetails> getAllOrders() {
        return orderDetailsService.getAllOrders();
    }
    
    @CrossOrigin(origins ="http://localhost:3000")
    @GetMapping("/orders/{id}")
    public Optional<OrderDetails> getOrderById(@PathVariable Long id) {
        return orderDetailsService.getOrderById(id);
    }
    
    
    @CrossOrigin(origins ="http://localhost:3000")
    @PutMapping("/orders/{id}")
    public OrderDetails updateOrder(@PathVariable Long id, @RequestBody OrderDetails orderDetails) {
        return orderDetailsService.updateOrder(id, orderDetails);
    }

    @CrossOrigin(origins ="http://localhost:3000")
    @DeleteMapping("/orders/{id}")
    public void deleteOrder(@PathVariable Long id) {
        orderDetailsService.deleteOrder(id);
    }

    // @CrossOrigin(origins ="http://localhost:3000")
    // @GetMapping("/orders/user")
    // public List<OrderDetails> getOrdersByUserEmail(@RequestParam String email) {
    //     return orderDetailsService.getOrdersByUserEmail(email);
    // }
   
}
