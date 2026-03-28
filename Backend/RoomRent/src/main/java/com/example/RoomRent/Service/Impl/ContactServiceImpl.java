package com.example.RoomRent.Service.Impl;


import com.example.RoomRent.Entity.Contact;
import com.example.RoomRent.Repository.ContactRepository;

import com.example.RoomRent.Service.ContactService;
import com.example.RoomRent.Service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ContactServiceImpl implements ContactService {

    private final ContactRepository contactRepo;
    private final EmailService emailService;

    @Autowired
    public ContactServiceImpl(ContactRepository contactRepo, EmailService emailService) {
        this.contactRepo = contactRepo;
        this.emailService = emailService;
    }

    @Override
    public void processContactRequest(Contact contact) {

        // 1. Save contact to DB
        try {
            // Save the contact first
            contactRepo.save(contact);
            // Log success with the new ID
            System.out.println("✅ Contact saved to DB with ID: " + contact.getId());
        } catch (Exception e) {
            e.printStackTrace();
            // If the database save fails, stop everything.
            throw new RuntimeException("Failed to save contact details.", e);
        }

        // 2. Check if email can be sent
        if (contact.getOwnerEmail() == null || contact.getOwnerEmail().isBlank()) {
            // Use the ID in the log
            System.err.println("⚠️ Contact saved (ID: " + contact.getId() + "), but owner email was missing. Cannot send email.");
            return; // Exit the method
        }

        // 3. Send the email
        try {
            String subject = "New Inquiry for Your Room: " + contact.getRoomTitle();
            String body = "Hello,\n\nYou have a new inquiry for your room '" + contact.getRoomTitle() + "'.\n\n"
                    + "From: " + contact.getName() + "\n"
                    + "Phone: " + contact.getPhone() + "\n\n"
                    + "Message:\n" + contact.getMessage() + "\n\n"
                    + "Best regards,\n ------------------\nRoomRent Team \n ------------------";

            emailService.sendEmail(contact.getOwnerEmail(), subject, body);
            // Use the ID in the log
            System.out.println("✅ Email sent to owner: " + contact.getOwnerEmail() + " for Contact ID: " + contact.getId());

        } catch (Exception e) {
            e.printStackTrace();
            // Use the ID in the log
            System.err.println("⚠️ Contact saved (ID: " + contact.getId() + "), but failed to send email.");
        }
    }
}