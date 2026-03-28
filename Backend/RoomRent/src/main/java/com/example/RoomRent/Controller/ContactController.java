package com.example.RoomRent.Controller;

import com.example.RoomRent.Entity.Contact;
// Import your new service

import com.example.RoomRent.Service.ContactService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/Room/v1/contact")
@CrossOrigin(origins = "http://localhost:3000")
public class ContactController {

    // ✅ Inject the new ContactService
    private final ContactService contactService;

    @Autowired
    public ContactController(ContactService contactService) {
        this.contactService = contactService;
        // You no longer need RoomRepo or EmailService here
    }

    @PostMapping
    public ResponseEntity<String> saveContact(@RequestBody Contact contact) {
        try {
            // ✅ Just call the service
            contactService.processContactRequest(contact);
            return ResponseEntity.ok("✅ Contact request processed successfully.");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("❌ Error processing contact request.");
        }
    }
}